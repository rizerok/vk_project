import {
    fetchResponseError,
    vkResponseError
} from 'utils/errors';
import {
    invalidOrExpiredTokenResponse,
    loginErrorResponse
} from 'constants/error-responses';


export const fetchResponseHandler = response => {
    if(!response.ok){
        throw fetchResponseError(response);
    }
    return response;
};

export const vkResponseHandler = result => {
    if(result.error){
        throw vkResponseError(result.error);
    }
    console.log(result.response);
    return result.response;
};

export const apiResponseHandler = (response) => {
    if(response.status === 'error'){
        switch(response.action){
            case invalidOrExpiredTokenResponse.action:
                console.log(invalidOrExpiredTokenResponse.action);
                break;
            case loginErrorResponse.action:
                console.log(loginErrorResponse.action);
                break;
        }
        return null;
    }else{
        return response;
    }
};