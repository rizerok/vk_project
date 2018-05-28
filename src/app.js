import ENV, { IS_DEV } from './utils/env';
//node
import path from 'path';
import fs from 'fs';
//Koa
import Koa from 'koa';
import serve from 'koa-static';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
//middleware
import router from 'middleware/router';
//src
import connectorsInit from 'connectors';

connectorsInit();

const app = new Koa();

//priority app.use is important
if(IS_DEV){
    app.use(logger());
}

app
    .use(serve(path.resolve('public')))
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

export default app;