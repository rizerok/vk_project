import Router from 'koa-router';
const login = new Router();

import {createVkApiUrl} from 'functions/vk-url-creator';
import {
    apiMethodUrl,
    client_id,
    display,
    redirect_uri,
    scope,
    response_type,
    v
} from 'constants/vk';

login.post('/', async ctx => {
    ctx.set({
        'Content-Type': 'application/json'
    });
    console.log(ctx.request.body);

    const {
        access_token,
        user_id
    } = ctx.request.body;

    //mongose

    fetch(createVkApiUrl(apiMethodUrl + 'users.get', {
        access_token,
        user_ids: user_id,
        v
    })).then((res) => res.json()).then(json => {
        console.log(json);
    });

    ctx.body = {
        answer: 'ura!!!'
    };
});

export default login;