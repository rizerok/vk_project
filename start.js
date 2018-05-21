const webpack = require('webpack');
const nodemon = require('nodemon');
const webpackConfig = require('./webpack.config.js')('development');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');

const config = require('config');

class Builder {
    constructor() {
        this.stringFormat = {
            colors: true,
            cache: false,
            modules: false,
            timings: true,
            errors: true,
            errorDetails: true,
            warnings: true
        };
        this.firstRun = true;
        this.serverPort = process.env.server_port || config.get('server_port');
        this.compiler = webpack(webpackConfig);
        this.applyProgressPlugin();
        this.runWatcher();
    }

    applyProgressPlugin() {
        this.compiler.apply(new ProgressPlugin((percentage, msg) => {
            let roundedPercentage = Math.ceil(percentage * 100);
            if (roundedPercentage === 100) {
                msg = `port - ${this.serverPort}`;
            }
            process.stdout.clearLine();
            process.stdout.write(`${roundedPercentage} ${msg}`);
            process.stdout.cursorTo(0);
        }));
    }

    runWatcher() {
        this.watcher = this.compiler.watch({}, (err, stats) => {
            console.log(stats.toString(this.stringFormat));
            if (this.firstRun) {
                this.runServer();
                this.firstRun = false;
                this.checkErrors(err, stats, true);
            } else {
                this.checkErrors(err, stats);
            }
        });
    }

    checkErrors(err, stats, exit = false) {
        if (err || stats.hasErrors() || stats.hasWarnings()) {
            exit ? this.watcher.close(() => {
                console.log('\x1b[31m', 'Check errors and warnings.', '\x1b[37m');
                process.exit(0);
            }) : console.log('\x1b[31m', 'Check errors and warnings.', '\x1b[37m');
        }
    }

    runServer() {
        nodemon({
            script: 'server/server.js',
            watch: 'server/server.js'
        }).on('restart', () => {
            process.env.NODEMON_STATUS = 'restarted';
        });
    }
}

new Builder();

process.on('SIGINT', () => {
    process.exit(0);
});
process.on('SIGTERM', () => {
    process.exit(0);
});
process.on('SIGUSR2', () => {
    process.exit(0);
});
process.on('exit', () => {
    process.exit(0);
});
