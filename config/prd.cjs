const moment = require('moment');

const version = `prd-${moment().local().format('YYYYMMDDHHmmss')}`;

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
    baseUrl: 'https://demo.wangyanfei.top',

  },
};
