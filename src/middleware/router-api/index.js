import Router from 'koa-router';
// routes
import login from './login';

const api = new Router();

api.use('/login', login.routes(), login.allowedMethods());


export default api;