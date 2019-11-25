class CopyrightWebppackPlugin {
  constructor(options) {
    console.log('插件被使用了')
    console.log(options, 'options')
  }

  apply(compiler) {
    compiler.hooks.compile.tap('CopyrightWebppackPlugin', () => {
      console.log('compiler')
    })

    compiler.hooks.emit.tapAsync('CopyrightWebppackPlugin', (compilation, cb) => {
      console.log(compilation)
      console.log('tapAsync')
      // 生成文件
      const txt = 'copyright by dell lee!'
      compilation.assets['copyright.txt'] = {
        source() {
          return txt
        },
        size(){
          return txt.length
        }
      }
      cb()
    })
  }
}

module.exports = CopyrightWebppackPlugin
