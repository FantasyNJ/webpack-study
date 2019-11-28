const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

const moduleAnalyser = (filename) => {
  const pathName = path.resolve(__dirname, filename)
  const content = fs.readFileSync(pathName, 'utf-8')
  const ast = parser.parse(content, {
    sourceType: "module"
  })
  const dependencies = {}
  const dirname = path.dirname(filename)
  // 深度遍历依赖
  traverse(ast, {
    ImportDeclaration({node}){
      dependencies[node.source.value] = './' + path.join(dirname, node.source.value)
    }
  })
  const { code } = babel.transformFromAstSync(ast, null, {
    presets: ["@babel/preset-env"]
  })
  return {
    filename,
    dependencies,
    code
  }
}


const makeDependenciesGraph = (entry) => {
  const entryModule = moduleAnalyser(entry)
  const graphArray = [entryModule]
  for (let i = 0; i < graphArray.length; i++) {
    const graphItem = graphArray[i]
    const {dependencies} = graphItem
    if (dependencies) {
      for (let key in dependencies) {
        graphArray.push(moduleAnalyser(dependencies[key]))
      }
    }
  }
  const graph = {}
  graphArray.forEach(item => {
    const {dependencies, code} = item
    graph[item.filename] = {
      dependencies,
      code
    }
  })
  return graph
}

const generateCode = entry => {
  const graph = JSON.stringify(makeDependenciesGraph(entry))
  /*
  * entry是入口
  * localRequire，闭包转换变量名称，这个方法很🐂🍺，重点就是这个方法，自己在自己实现的时候没考虑到
  * */
  return `
    (function(graph){
      function require(entry){
        var module = graph[entry]
        var exports = {}
        function localRequire(path){
          return require(module.dependencies[path])
        }
        (function(require){
          eval(module.code)
        })(localRequire)
        return exports
      }
      require('${entry}')
    })(${graph})
  `
}

const code = generateCode('./src/index.js')
console.log(code)
