import {
    fetchResponseError,
    vkResponseError,
    mongoResultError
} from 'utils/errors';

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

//temporary
export const MongoResultHandler = (err) => {
    if(err){
        return mongoResultError(err);
    }else{
        console.log('success');
        return {success:true};
    }
};