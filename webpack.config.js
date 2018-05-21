const merge = require('webpack-merge');
const dotenv = require('dotenv');
dotenv.config();

const sameRule = function(a,b){
    if(String(a.test)!==String(b.test)){//check test
        return false;
    }

    let use1, use2;
    Array.isArray(a.use) ? use1 = a.use : use1 = [a.use];
    Array.isArray(b.use) ? use2 = b.use : use2 = [b.use];
    if(use1.length!==use2.length){//check loaders count
        return false;
    }

    for(let i = 0;i<use1.length;i++){//check by loaders
        if(use1[i].loader !== use2[i].loader){
            return false;
        }
    }

    return true;
};

const mergeConfig = {
    customizeArray(a, b, key) {
        if(key === 'module.rules'){
            let rules = b;
            a.forEach(elA=>{
                if(rules.every(r=>!sameRule(r,elA))){//uniq
                    rules.push(elA);
                }
            });
            return rules;
        }
        if(key === 'plugins'){//remove ExtractTextPlugin from a
            if(
                a.find(elA=>elA.constructor.name==='ExtractTextPlugin') &&
                b.find(elB=>elB.constructor.name==='ExtractTextPlugin')
            ){
                let etp = a.find(elA=>elA.constructor.name==='ExtractTextPlugin');
                let idx = a.indexOf(etp);
                a.splice(idx,1);
            }
        }
        return undefined;
    },
    customizeObject(a, b, key) {
        if (key === 'entry') {
            return b;
        }
        return undefined;
    }
};

module.exports = function (env) {
    console.log(process.env.NODE_ENV);
    const ENV = env || process.env.NODE_ENV || 'development';

    let clientConfig;
    let serverConfig = require('./webpack/webpack.server.js');

    console.log(`Run ${ENV} build.`);

    switch(ENV) {
        case 'development': {
            const base = require(`./webpack/webpack.client.js`);
            const dev = require(`./webpack/webpack.dev.js`);
            clientConfig = merge(mergeConfig)(base, dev);
            break;
        }
        case 'production': {
            const base = require(`./webpack/webpack.client.js`);
            const prod = require(`./webpack/webpack.prod.js`);
            clientConfig = merge(mergeConfig)(base, prod);
            break;
        }
    }
    return [clientConfig,serverConfig];
};