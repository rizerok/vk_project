import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

mongoose.plugin(uniqueValidator);

export default function mongooseConnector(){
    return mongoose.connect('mongodb://localhost/project_vk')
        .then(() => console.log('mongoDB has started...'));
}