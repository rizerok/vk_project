import React from 'react';
import fetchJsonp from 'fetch-jsonp';
import c from 'classnames';

import style from './style.scss';

const vkOauthUrl = 'https://oauth.vk.com/authorize';
const vkApiMethodUrl = 'https://api.vk.com/method/';
const client_id = 6440100;
const display = 'page';
const redirect_uri = 'https://oauth.vk.com/blank.html';
const scope = [
    'groups'
];
const response_type = 'token';
const v = 5.74;

const createUrl = (url, params) => {
    const urlObject = new URL(url);
    const searchParams = new URLSearchParams();
    for(let key in params){
        searchParams.append(key, params[key]);
    }
    urlObject.search = searchParams.toString();
    console.log(decodeURI(urlObject.href));
    return urlObject.href;
};

// data.completed
// let member = {
//     id:'',
//     subscriptions:[
//         ids
//     ]
//     fullSubscription: true,
//     allSubscriptionCount
// };

// data.completed
// let subscription = {
//     id,
//     originalData,
//     subscriptionsCount
// };

class Member{
    constructor(id){
        this.id = id;
        this.subscriptions = [];
        this.allSubscriptionCount = 0;
        this.fullSubscriptions = null;
        this.status = 'undefined';
    }
    addSubscriptionIds(groupsIds){
        this.subscriptions.push(...groupsIds);
    }
    addSubscriptionsInformation(allSubscriptionCount){
        //method call after receive all subscriptions
        this.allSubscriptionCount = allSubscriptionCount;
        this.fullSubscriptions = allSubscriptionCount >= 1000;
    }
    setMemberStatus(status){
        this.status = status;
    }
}

class Group{
    constructor(id){
        this.id = id;
        this.originalData = null;
        this.subscriptionsCount = 0;
    }
    increaseSubscriptionCount(count = 1){
        this.subscriptionsCount += count;
    }
    setOriginalData(od){
        this.originalData = od;
    }
}

class GroupList{
    constructor(){
        this.list = [];
    }
    addGroups(groupOriginalDataList){
        groupOriginalDataList.forEach(godl => {
            const group = this.list.find(gl => gl.id === godl.id);
            if(group){
                group.increaseSubscriptionCount();
            }else{
                const group = new Group(godl.id);
                group.setOriginalData(godl);
                this.list.push(group);
            }
        });
    }
}

class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            token:'',
            ownGroups:[],
            ownChooseGroupId: null,
            membersGroups:[]
        };
        this.data = {
            members:[],
            groupList: new GroupList()
        };

        this.memberLoadingPromise = null;

    }
    componentDidMount(){
        const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

        this.setState({
            token:ACCESS_TOKEN ? ACCESS_TOKEN : ''
        });
    }

    handleChange(event){
        localStorage.setItem('ACCESS_TOKEN', event.target.value);
        this.setState({token: event.target.value});
    }

    getAdministrationGroups(){
        console.log(this.state.token);
        fetchJsonp(createUrl(vkApiMethodUrl + 'groups.get', {
            filter:'admin',
            access_token:this.state.token,
            v
        })).then((response) => {
            return response.json();
        }).then((json) => {
            const groupsIds = json.response.items;
            this.getOwnGroupsByIds(groupsIds);
        }).catch((ex) => {
            console.log('parsing failed', ex);
        });
    }

    getOwnGroupsByIds(ids){
        fetchJsonp(createUrl(vkApiMethodUrl + 'groups.getById', {
            access_token:this.state.token,
            group_ids: ids,
            fields: ['members_count'],
            v
        })).then((response) => {
            return response.json();
        }).then((json) => {
            console.log(json);
            this.setState({
                ownGroups:json.response
            });
        }).catch((ex) => {
            console.log('parsing failed', ex);
        });
    }

    chooseGroup(id){
        this.setState({
            ownChooseGroupId: id
        });
    }

    getMembers(init = false){//recursive
        init && (this.data.members = []);
        fetchJsonp(createUrl(vkApiMethodUrl + 'groups.getMembers', {
            access_token:this.state.token,
            group_id: this.state.ownChooseGroupId,
            offset: this.data.members.length,
            v
        })).then((response) => {
            return response.json();
        }).then((json) => {
            console.log(json);
            const membersIds = json.response.items;
            const members =  membersIds.map(memberId => new Member(memberId));
            this.data.members.push(...members);
            console.log(this.data.members);
            if(this.data.members.length < json.response.count){
                console.log(`members ${this.data.members.length} of ${json.response.count}`);
                setTimeout(() => {
                    this.getMembers();
                }, 250);
            }else{
                console.log(`all ${this.data.members.length} received.`);
            }
        }).catch((ex) => {
            console.log('parsing failed', ex);
        });
    }

    getMemberGroups(member, resolve, init = false){
        init && (member.subscriptions = []);

        fetchJsonp(createUrl(vkApiMethodUrl + 'users.getSubscriptions', {
            access_token:this.state.token,
            user_id: member.id,
            offset: member.subscriptions.length,
            extended:1,
            count:200,
            v
        })).then((response) => {
            return response.json();
        }).then((json) => {
            console.log('json', json);
            if(json.error){
                member.setMemberStatus(json.error.error_msg);
                resolve({message:'user banned.'});
            }

            member.addSubscriptionIds(json.response.items.map(item => item.id));
            this.data.groupList.addGroups(json.response.items);
            console.log(this.data.groupList.list);

            const hasLimit = member.subscriptions.length === 1000;

            if(member.subscriptions.length < json.response.count && !hasLimit){
                console.log(`${member.id} member groups ${member.subscriptions.length} of ${json.response.count}`);
                setTimeout(() => {
                    //recursive with timeout
                    this.getMemberGroups(member, resolve);
                }, 250);
            }else{
                member.addSubscriptionsInformation(json.response.count);
                console.log(`all ${member.subscriptions.length} received.`);
                resolve({message:'URA!!!'});
            }

        }).catch((ex) => {
            //console.log('parsing failed', ex);
            //resolve({message:'NE URA!!!'});
            throw new Error('parsing failed ' + ex);

        });

        if(init){
            return this.memberLoadingPromise;
        }
    }

    getMembersGroups(i){
        if(i < this.data.members.length){
            console.log('go member', i);
            this.memberLoadingPromise = new Promise((resolve) => this.getMemberGroups(this.data.members[i], resolve,  true));
            this.memberLoadingPromise.then(res => {
                setTimeout(() => {
                    i++;
                    this.getMembersGroups(i);
                }, 250);
            });
        }else{
            console.log('data', this.data);
        }
    }

    render(){
        return <div className={style.home}>
            <div>
                <div className={style.homeLine}>
                    <a href={createUrl(vkOauthUrl, {client_id, display, redirect_uri, scope, response_type, v})} target="_blank">getToken</a>
                </div>
                {
                    <div className={style.getToken}>
                        <span>Enter ACCESS_TOKEN: </span><input type="text" value={this.state.token} onChange={this.handleChange.bind(this)} />
                    </div>
                }
                <div>
                    <button onClick={this.getAdministrationGroups.bind(this)}>Get Administration groups</button>
                </div>
                <div className={style.groupList}>
                    {
                        this.state.ownGroups.map((g, i) =>
                            <div className={c(style.groupListItem, {
                                [style.groupListItemActive]:g.id === this.state.ownChooseGroupId
                            })} key={i}
                                onClick={this.chooseGroup.bind(this, g.id)}
                            >
                                <img src={g.photo_50} alt=""/>
                                <div className={style.groupListItemText}>
                                    <div className={style.groupListItemName}>
                                        {g.name}
                                    </div>
                                    <div className={style.groupListItemCount}>
                                        {g.members_count}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div>
                    { this.state.ownChooseGroupId && (
                        <button onClick={this.getMembers.bind(this, true)}>Get members</button>
                    )}
                </div>
                <div>
                    { this.state.ownChooseGroupId && (
                        <button onClick={this.getMembersGroups.bind(this, 0)}>Get members groups</button>
                    )}
                </div>


            </div>
        </div>;
    }
}

export default Home;