import {SERVICE_TOKEN, CLIENT_SECRET} from 'src/config';
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

const authorization = {
    checkToken(token){
        return fetch(createVkApiUrl(apiMethodUrl+ 'secure.checkToken',{
            token,//user token
            access_token: SERVICE_TOKEN,
            client_secret: CLIENT_SECRET,
            v
        }))
            .then(fetchResponseHandler)
            .then((res) => res.json())
            .then(vkResponseHandler)
            .catch(loginErrorHandler);
    },
    getVkGroups(groupsIds){
        return VkGroup.find({id:{$in:groupsIds}});
    },
    getSiteGroups(groupsIds){
        return SiteGroup.find({vk_id:{$in:groupsIds}});
    },
    getGroups(groupsIds){
        return Promise.all([
            this.getVkGroups(groupsIds),
            this.getSiteGroups(groupsIds)
        ]);
    },
    async run(access_token, siteUser){
        //check Token
        const checkToken = await this.checkToken(access_token);
        if(checkToken.status === 'error') {
            return checkToken;//invalid or expired token
        }
        const vkUser = await VkUser.findOne({id: siteUser.vk_id});
        if(access_token !== siteUser.access_token){//expired
            //update
            siteUser = await SiteUser.findOneAndUpdate(
                {vk_id: siteUser.vk_id},
                {access_token},
                {
                    new: true//actual data
                }
            );
        }

        const [vkGroups, siteGroups] = await this.getGroups(siteUser.own_groups);

        return {
            siteUser: siteUser.toObject(),
            vkUser: vkUser.toObject(),
            vkGroups: vkGroups.map(vg => vg.toObject()),
            siteGroups: siteGroups.map(sg => sg.toObject())
        };
    }
};

export default authorization;