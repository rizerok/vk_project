import 'isomorphic-fetch';
class Api{
    constructor(){
        this.path = '/api/';
    }
    config(path){
        this.path = path;
    }
    fetch(url, ...args){
        return fetch(this.path + url, ...args);
    }
    login(...args){
        return this.fetch('login',...args);
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