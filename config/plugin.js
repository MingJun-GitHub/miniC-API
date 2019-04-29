'use strict';

/** @type Egg.EggPlugin */
//module.exports = {
// had enabled by egg
// static: {
//   enable: true,
// }
//};
// 数据库
exports.mysql = {
  enable: true,
  package: 'egg-mysql'
};
// 验证
exports.validate = {
  enable: true,
  package: 'egg-validate',
};
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};