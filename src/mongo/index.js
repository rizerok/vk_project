import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/project_vk')
    .then(() => console.log('mongoDB has started...'))
    .catch(e => console.log(e));

import './vk-user';

// const VkUser = mongoose.model('vkUser');
//
// const vkUser = new VkUser({
//     id: 1,
//     first_name: 'test',
//     last_name: 'last',
//     bdate: '01.02.2003',
//     sex: 1,
//     city: 'City',
//     country: 'Country',
//     photo_50: 'http://test.ru'
// });