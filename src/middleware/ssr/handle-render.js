//node
import fs from 'fs';
import path from 'path';
//React
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import {renderRoutes, matchRoutes} from 'react-router-config';
//src
import reducer from 'src/reducers';
import routes from 'src/routes';
import renderBaseTemplate from 'templates/base';
import handleStaticRouterContext from 'middleware/ssr/handle-static-router-context';

const manifest = JSON.parse(fs.readFileSync(path.resolve('manifest.json'), 'utf8'));

const handleRender = (preloadedState) => async function (ctx) {
    console.log(ctx.url);
    preloadedState = preloadedState || ctx.state.preloadedState || {};

    const store = createStore(reducer, preloadedState, applyMiddleware(thunk));

    const branch = matchRoutes(routes, ctx.url);

    const promises = branch.map(({route}) => {
        let fetchData = route.component.fetchData;
        return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null);
    });

    await Promise.all(promises);

    let staticRouterContext = {};

    let html = renderToString(
        <Provider store={store}>
            <StaticRouter location={ctx.url} context={staticRouterContext}>
                {renderRoutes(routes)}
            </StaticRouter>
        </Provider>
    );

    const finalState = store.getState();

    await handleStaticRouterContext(staticRouterContext, ctx);

    ctx.body = renderBaseTemplate(html, finalState, manifest);
};

export default handleRender;