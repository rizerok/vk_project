import mongooseConnector from 'mongo';
import server from 'src/server';

async function connectionsInit(){
    try {
        await mongooseConnector();
    } catch (e) {
        server.close();
        console.log(e);
    }
}

export default connectionsInit;