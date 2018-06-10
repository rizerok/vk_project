import mongoose from 'mongoose';
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
},{
    toObject: {
        transform(doc, ret) {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

export default mongoose.model('SiteGroup',siteGroupSchema);