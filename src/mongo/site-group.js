import mongoose from 'mongoose';
import VkGroup from 'mongo/vk-group';
const Schema = mongoose.Schema;

const siteGroupSchema = new Schema({
    vk_id: {
        type: Number,
        required: true,
        unique: 'Group with vk_id "VALUE" already exist'
    },
    owner: {
        type: Number
    }
});

export default mongoose.model('SiteGroup',siteGroupSchema);