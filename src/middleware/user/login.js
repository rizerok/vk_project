import SiteUser from 'mongo/site-user';
import registration from 'middleware/user/registration';
import authorization from 'middleware/user/authorization';
import {invalidOrExpiredTokenResponse} from 'constants/error-responses';
import {filterUserPrivateFields} from 'utils/filters';

const login = async ctx => {
    let data = {};
    const {
        access_token,
        user_id: vk_id
    } = ctx.request.body;
    //check token
    if(!access_token || !vk_id){
        data = invalidOrExpiredTokenResponse;
    }else{
        //find user in db
        const siteUser = await SiteUser.findOne({vk_id});
        //identify further actions
        if(siteUser){//authorization
            data = await authorization.run(access_token, siteUser);
        }else{//registration
            data = await registration.run(access_token, vk_id);
        }
        //set session cookie
        if(data.status !== 'error'){
            console.log('set token - ', data.siteUser.access_token);
            ctx.cookies.set('access_token', data.siteUser.access_token);
            data.siteUser = filterUserPrivateFields(data.siteUser);
        }
    }

    //handle response data
    ctx.body = data;
};

export default login;