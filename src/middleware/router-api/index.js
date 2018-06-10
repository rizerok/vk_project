import Router from 'koa-router';
// routes
import login from './login';
import userAuthentication from 'middleware/user/authentication';

const api = new Router();

api.use('/login', login.routes(), login.allowedMethods());
api.use(userAuthentication());
//below private routes
api.get('/test', async ctx => {console.log('test');ctx.body = 'test';});


export default api;