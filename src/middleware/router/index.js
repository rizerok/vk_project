import {urlUser, urlLogin, urlApi} from 'constants/urls';
import Router from 'koa-router';
import handleRender from 'middleware/ssr/handle-render';
//routes
import api from 'middleware/router-api';
import user from 'middleware/router-user';
import login from 'middleware/router-login';

const router = new Router();

router.use(urlApi, api.routes(), api.allowedMethods());
router.use(urlUser, user.routes(), user.allowedMethods());
router.use(urlLogin, login.routes(), login.allowedMethods());
router.get('*', handleRender());

export default router;