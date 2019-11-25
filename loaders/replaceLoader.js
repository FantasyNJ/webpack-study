const loaderUtils = require('loader-utils')
// 必须是普通函数，webpack会改变函数的this指向
module.exports = function (source) {
  // 自动分析this.query
  const options = loaderUtils.getOptions(this)
  return source.replace(/dell/g, options.name)
  // 也可以使用this.callback
}
