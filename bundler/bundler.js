const fs = require('fs')

const moduleAnalyser = (filename) => {
  const content = filename.readFileSync(filename, 'utf-8')
  console.log(content)
}

moduleAnalyser('./src/index.js')
