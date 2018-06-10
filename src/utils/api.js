import 'isomorphic-fetch';
import {urlApi} from 'constants/urls';
import {
    fetchResponseHandler,
    apiResponseHandler
} from 'utils/response-handlers';

class Api{
    constructor(){
        this.path = urlApi;
    }
    config(path){
        this.path = path;
    }
    fetch(url, ...args){
        return fetch(this.path + url, ...args)
            .then(fetchResponseHandler)
            .then(res => res.json())
            .then(apiResponseHandler)
            .catch(e => console.log('catch',e));
    }
    login(accessToken,userId){
        return this.fetch('/login',{
            method:'POST',
            credentials: 'same-origin',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                access_token: accessToken,
                user_id: userId
            })
        });
    }
    getUsers(){
        return fetch('//jsonplaceholder.typicode.com/users')
            .then(res => {
                return res.json();
            });
    }
}

const api = new Api;

export default api;