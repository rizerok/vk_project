import {urlUser} from 'constants/urls';
import Router from 'koa-router';

import userAuthentication from 'middleware/user/authentication';
import handleRender from 'middleware/ssr/handle-render';

const redirect = (ctx, url) => {
    ctx.status = 302;
    ctx.redirect(url);
};

const login = new Router();
//check what user is login
login.use(userAuthentication((status, ctx, next) => {
    //if not login then render login
    handleRender()(ctx, next);
}));
login.use(async (ctx, next) => {
    //if login, redirect to /user
    redirect(ctx, urlUser);
});

export default login;