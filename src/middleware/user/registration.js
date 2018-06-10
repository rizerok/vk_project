import {createVkApiUrl} from 'functions/vk-url-creator';
import {
    apiMethodUrl,
    v
} from 'constants/vk';
import SiteUser from 'mongo/site-user';
import VkUser from 'mongo/vk-user';
import SiteGroup from 'mongo/site-group';
import VkGroup from 'mongo/vk-group';
import {
    fetchResponseHandler,
    vkResponseHandler
} from 'utils/response-handlers';
import {loginErrorHandler} from 'utils/error-handlers';

const registration = {
    getVkUser(access_token, user_id){
        return fetch(createVkApiUrl(apiMethodUrl + 'users.get', {
            access_token,
            user_ids: user_id,
            v,
            fields: 'bdate,sex,city,country,photo_50'
        }))
            .then(fetchResponseHandler)
            .then((res) => res.json());
    },
    getOwnGroups(access_token, user_id){
        return fetch(createVkApiUrl(apiMethodUrl + 'groups.get', {
            access_token,
            filter:'admin',
            user_id: user_id,
            v,
            fields: 'members_count',
            extended: 1
        }))
            .then(fetchResponseHandler)
            .then(res => res.json());
    },
    getVkData(access_token, user_id){
        return Promise.all([
            this.getVkUser(access_token, user_id),
            this.getOwnGroups(access_token, user_id)
        ])
            .then(resArr => resArr.map(r => vkResponseHandler(r)))
            .catch(loginErrorHandler);
    },
    async saveToDb(access_token, vkUser, ownGroups){
        return Promise.all([
            new VkUser(vkUser).save(),
            new SiteUser({
                access_token,
                vk_id: vkUser.id,
                own_groups: ownGroups.map(g => g.id)
            }).save(),
            ...ownGroups.map(g => new VkGroup(g).save()),
            ...ownGroups.map(g => new SiteGroup({
                vk_id: g.id,
                owner: vkUser.id
            }).save()),
        ])
            .then(([vkUser, siteUser]) => ({
                siteUser,
                vkUser,
                vkGroups:ownGroups,
                siteGroups:ownGroups.map(g => ({
                    vk_id: g.id,
                    owner: vkUser.id
                }))
            }))
            .catch(loginErrorHandler);
    },
    async run(access_token, user_id){
        const vkData = await this.getVkData(access_token, user_id);
        console.log('vkData', vkData);
        if(vkData.status === 'error'){
            return vkData;
        }

        const [[vkUser],{items:ownGroups}] = vkData;
        return this.saveToDb(access_token, vkUser, ownGroups);
    }
};

export default registration;