import Router from 'koa-router';

import loginMiddleware from 'middleware/user/login';

const login = new Router();

login.post('/', loginMiddleware);

export default login;