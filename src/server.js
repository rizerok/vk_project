import { SERVER_PORT } from './config';
import app from './app';

const server = app.listen(SERVER_PORT, err => {
    if(err){
        console.log(err);
    }

    console.log(`Server running on port ${SERVER_PORT}`);
});

export default server;