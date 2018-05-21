const createVkApiUrl = (url, params) => {
    const urlObject = new URL(url);
    const searchParams = new URLSearchParams();
    for(let key in params){
        searchParams.append(key, params[key]);
    }
    urlObject.search = searchParams.toString();
    return urlObject.href;
};

export {createVkApiUrl};