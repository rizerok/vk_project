import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const vkUser = new Schema({
    id:{
        type: Number,
        required: true
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    bdate:{
        type: String
    },
    sex:{
        type: Number
    },
    city:{
        type: String
    },
    country: {
        type: String
    },
    photo_50: {
        type: String
    }
});

mongoose.model('vkUser', vkUser);