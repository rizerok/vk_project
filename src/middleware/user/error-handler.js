import {
    invalidOrExpiredTokenResponse,
    loginErrorResponse
} from 'constants/error-responses';

export default (e) => {
    console.log(e);
    if(e.object && (e.object.error_code === 15 || e.object.error_code === 5)){
        return invalidOrExpiredTokenResponse;
    }
    return loginErrorResponse;
};