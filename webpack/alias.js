const {resolve} = require('path');
module.exports = {
    root:resolve(),
    public:resolve('public'),
    src:resolve('src'),
    components:resolve('src','components'),
    utils:resolve('src','utils'),
    styles:resolve('src','assets','styles'),
    fonts:resolve('src','assets','fonts'),
    img:resolve('src','assets','images'),
    functions:resolve('src','functions'),
    constants:resolve('src', 'constants'),
    middleware: resolve('src', 'middleware'),
    templates: resolve('src', 'templates'),
    mongo: resolve('src', 'mongo'),
    connectors: resolve('src', 'connectors'),
    modules: resolve('src', 'modules')
};
