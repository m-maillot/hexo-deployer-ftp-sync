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
            'For more help, you can check the docs: ' + 'http://hexo.io/docs/deployment.html'.underline
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

    ftpDeploy
        .deploy(config)
        .then((res) => callback(res))
        .catch((err) => callback(err));
});