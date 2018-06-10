require('dotenv').config();
import env from './utils/env';
import envs from './constants/envs';
import config from 'config';

if(!envs[env]){
    throw Error(`unknown env ${env}`);
}

const SERVER_PORT = process.env.server_port || config.get('server_port');
const CLIENT_SECRET = process.env.client_secret || config.get('client_secret');
const SERVICE_TOKEN = process.env.service_token || config.get('service_token');
const CLIENT_ID = process.env.client_id || config.get('client_id');

export {
    SERVER_PORT,
    CLIENT_SECRET,
    SERVICE_TOKEN,
    CLIENT_ID
};