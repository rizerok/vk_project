import {urlLogin} from 'constants/urls';

const  handleStaticRouterContext = async (routerContext, ctx) => {
    switch(routerContext.status){
        case 404:
            ctx.status = 404;
            break;
        case 302:
            ctx.status = 302;
            ctx.redirect(urlLogin);
            break;
    }
};

export default handleStaticRouterContext;