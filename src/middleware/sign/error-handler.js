export default (e) => {
    console.log(e);
    return {
        status: 'error',
        msg: 'Во время входа в аккаунт произошла ошибка.'
    };
};