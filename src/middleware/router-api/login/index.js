import Router from 'koa-router';

import SiteUser from 'mongo/site-user';
import VkUser from 'mongo/vk-user';
import signUp from 'middleware/sign/signup';

const login = new Router();

login.post('/', async ctx => {
    let data = {};
    const {
        access_token,
        user_id: vk_id
    } = ctx.request.body;

    const siteUser = await SiteUser.findOne({vk_id});
    if(siteUser){//login
        const vkUser = await VkUser.findOne({id: vk_id});
        data = {
            siteUser,
            vkUser
        };
    }else{//create
        data = await signUp.run(access_token, vk_id);
    }

    if(data.status !== 'error'){
        console.log('token token token', data.siteUser.access_token);
        ctx.cookies.set('access_token', data.siteUser.access_token);
    }

    ctx.set({
        'Content-Type': 'application/json'
    });
    ctx.body = data;
});

export default login;