const mongoose = require('mongoose')

module.exports = [
    {
        title: 'Collage',
        promptInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'promptSeedData'
        },
        note: 'fun, bit messy',
        experienceDesc: 'Cras dictum cursus felis vel tincidunt. In nisi sapien, blandit sed risus sed, pellentesque suscipit odio. Fusce mollis commodo orci sit amet dictum. Pellentesque porttitor, mauris vel venenatis lobortis, augue orci ultricies nulla, eu interdum est sapien congue sem. Maecenas eu lectus id mi interdum eleifend. Etiam efficitur commodo mi, in aliquam risus scelerisque at. Praesent ultricies diam a tincidunt commodo.',
        photo: 'https://unsplash.com/photos/xb0wLfZH9Zo'
    },
    {
        title: 'Space',
        promptInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'promptSeedData'
        },
        note: 'slfejkekfe',
        experienceDesc: 'Cras dictum cursus felis vel tincidunt. In nisi sapien, blandit sed risus sed, pellentesque suscipit odio. Fusce mollis commodo orci sit amet dictum. Pellentesque porttitor, mauris vel venenatis lobortis, augue orci ultricies nulla, eu interdum est sapien congue sem. Maecenas eu lectus id mi interdum eleifend. Etiam efficitur commodo mi, in aliquam risus scelerisque at. Praesent ultricies diam a tincidunt commodo.',
        photo: 'http://www.mericherry.com/wp-content/uploads/2013/11/outerspace11.jpg'
    },
    {
        timestamp: (1412180887, 1)
    }
];
 