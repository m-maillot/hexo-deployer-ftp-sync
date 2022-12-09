# FTP deployer

[![NPM version](https://badge.fury.io/js/hexo-deployer-ftp-sync.svg)](https://www.npmjs.com/package/hexo-deployer-ftp-sync)

Deploy your site via FTP.

## Install

```
$ npm install hexo-deployer-ftp-sync --save
```

```
$ yarn add hexo-deployer-ftp-sync
```

## Usage

Edit settings.
````yaml
deploy:
  type: ftpsync
  host: <host>
  user: <user>
  password: <password>
  remote: [remote]
  port: [port]
  ignore: [ignore]
````

| Option | Description                               | Default |
|--------|-------------------------------------------|---------|
| host   | Address of remote host                    |         |
| user   | Username                                  |         |
| pass   | Password                                  |         |
| remote | Root directory of remote host             | /       |
| port   | Port                                      | 21      |
| ignore | Ignore the files on either host or remote | false   |

## Warning

This application will delete files and directories on the remote server to match the local machine. Use this application in production at your own risk.