const moment = require('moment');

const version = `dev-${moment().local().format('YYYYMMDDHHmmss')}`;

module.exports = {
  env: {
    // 当前版本号
    version,
    // 基础路径
    base: '/v2',
    // 时区
    timezone: 'Asia/Shanghai',
  },
  app: {
    baseUrl: 'https://127.0.0.1:8080',
  },
};
