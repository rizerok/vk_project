require('dotenv').config();
import env from './utils/env';
import envs from './constants/envs';
import config from 'config';

if(!envs[env]){
    throw Error(`unknown env ${env}`);
}

const SERVER_PORT = process.env.server_port || config.get('server_port');

export {
    SERVER_PORT
};