import {urlLogin} from 'constants/urls';
import Router from 'koa-router';

import userAuthentication from 'middleware/user/authentication';
import authorization from 'middleware/user/authorization';
import handleRender from 'middleware/ssr/handle-render';
import userReducer, {USER_SET} from 'modules/user';
import { filterUserPrivateFields } from 'utils/filters';

const redirect = (ctx, url) => {
    ctx.status = 302;
    ctx.redirect(url);
};

const user = new Router();
//use once when user visit site from new page
user.use(userAuthentication((status, ctx) => redirect(ctx, urlLogin)));
user.use(async (ctx, next) => {
    const access_token = ctx.cookies.get('access_token');
    const siteUser = ctx.state.siteUser;
    const state = await authorization.run(access_token, siteUser);
    if(state.status === 'error'){
        redirect(ctx, `/${state.data.to}`);
        return;
    }

    state.siteUser = filterUserPrivateFields(siteUser);
    //create redux state object
    ctx.state.preloadedState = {
        user:userReducer({}, {
            type: USER_SET,
            payload: state
        })
    };
    await next();
});
user.get('*',handleRender());


export default user;