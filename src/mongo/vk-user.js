import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const vkUserSchema = new Schema({
    id:{
        type: Number,
        required: true,
        unique: 'User with id "VALUE" already exist'
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

export default mongoose.model('VkUser', vkUserSchema);