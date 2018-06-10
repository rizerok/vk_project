import SiteUser from 'mongo/site-user';

const userAuthentication = (onError) => async (ctx, next) => {
    const access_token = ctx.cookies.get('access_token');
    console.log('access_token', access_token);
    if(!access_token || !access_token.length === 85){
        onError && onError('accessTokenError', ctx, next);
        return;//invalid token, run on error
    }
    const siteUser = await SiteUser.findOne({access_token});
    console.log('siteUser', siteUser);
    if(!siteUser){
        onError && onError('siteUserError', ctx, next);
        return;//no find in db, run on error
    }
    console.log('gooood', siteUser);
    ctx.state.siteUser = siteUser;
    await next();
};

export default userAuthentication;