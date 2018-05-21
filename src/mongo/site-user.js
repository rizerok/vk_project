import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const vkUser = new Schema({
    access_token:{
        type: String,
        required: true
    },
    vk_id:{
        type: Number,
        required: true
    }
});

mongoose.model('vkUser', vkUser);