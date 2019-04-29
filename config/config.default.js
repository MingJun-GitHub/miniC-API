/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1556416941795_886';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.imgBase = {
    uploadPath: '',
    baseUrl: 'http://10.66.51.134:7002/public/upload/'
  }
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'sbjewcw123',
      database: 'miniapp',
      dateStrings: true
    },
    app: true,
    agent: false
  }
  config.view = {
    mapping: {
      '.html': 'ejs'
    }
  }
  return {
    ...config,
    ...userConfig,
  };
};