import {urlLogin} from 'constants/urls';
export const invalidOrExpiredTokenResponse = {
    status: 'error',
    action: 'redirect',
    data:{
        to: urlLogin,
        msg: 'invalid or expired token.'
    }
};

export const loginErrorResponse = {
    status: 'error',
    action: 'notice',
    data: {
        msg: 'Во время входа в аккаунт произошла ошибка.'
    }
};