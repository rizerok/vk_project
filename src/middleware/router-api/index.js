import Router from 'koa-router';
// routes
import login from './login';
import userAuthentication from 'middleware/user/authentication';

const api = new Router();
const test = new Router();

api.use('/login', login.routes(), login.allowedMethods());
api.use(userAuthentication);
api.use('/test', test.routes(), test.allowedMethods());


export default api;