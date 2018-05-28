import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const vkGroupSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: 'Group with id "VALUE" already exist'
    },
    name: {
        type: String,
        required: true
    },
    screen_name: {
        type: String,
        required: true
    },
    is_closed: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    photo_50: {
        type: String,
        required: true
    },
    photo_100: {
        type: String,
        required: true
    },
    photo_200: {
        type: String,
        required: true
    },
    members_count: {
        type: Number,
        required: true
    }
});

export default mongoose.model('VkGroup',vkGroupSchema);