import mongoose from 'mongoose';
import VkUser from 'mongo/vk-user';
const Schema = mongoose.Schema;

const siteUserSchema = new Schema({
    access_token:{
        type: String,
        required: true
    },
    vk_id:{
        type: Number,
        required: true,
        unique: 'User with vk_id "VALUE" already exist'
    },
    own_groups:{
        type: [Number]
    }
});

export default mongoose.model('SiteUser', siteUserSchema);