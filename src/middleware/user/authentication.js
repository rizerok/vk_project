const userAuthentication  = async (ctx,next) => {
    const access_token = ctx.cookies.get('access_token');
    console.log('authentication', access_token);
};

export default userAuthentication;