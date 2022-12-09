'use strict';

const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

hexo.extend.deployer.register('ftpsync', (args, callback) => {

    if (!args.host || !args.user || args.password == null) {
        const help = [
            'You should configure deployment settings in _config.yml first!',
            '',
            'Example:',
            '  deploy:',
            '    type: ftpsync',
            '    host: <host>',
            '    port: [port] # Default is 21',
            '    remote: [remote] # Default is `/`',
            '    user: <user>',
            '    password: <password>',
            '    ignore: false # Default is false',
            '    passive: true # Default is true',
            '',
            'For more help, you can check the docs: ' + 'https://github.com/m-maillot/hexo-deployer-ftp-sync#usage'.underline
        ];

        console.log(help.join('\n'));
        return callback();
    }

    const config = {
        user: args.user,
        password: args.password,
        host: args.host,
        port: args.port || 21,
        localRoot: hexo.public_dir,
        remoteRoot: args.remote || '/',
        include: ["*", "**/*"],
        deleteRemote: !args.ignore,
        // Passive mode is forced (EPSV command is not sent)
        forcePasv: args.passive === undefined ? true : args.passive,
        // use sftp or ftp
        sftp: false,
    };

    if (args.verbose) {
        console.log("Config:");
        console.log(config);
    }

    ftpDeploy
        .deploy(config)
        .then((res) => {
            console.log(res);
            callback();
        })
        .catch((err) => {
            if (args.verbose) {
                console.error("Upload failed");
                console.error(err);
            }
            callback(err);
        });
});