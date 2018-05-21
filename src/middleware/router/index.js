import Router from 'koa-router';
import handleRender from 'middleware/ssr/handle-render';
//routes
import api from 'middleware/router-api';

const router = new Router();

router.use('/api', api.routes(), api.allowedMethods());
router.get('*', handleRender());

export default router;