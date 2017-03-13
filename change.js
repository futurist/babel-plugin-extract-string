const { transform } = require('babel-core')
const assert = require('assert')
const fs = require('fs')
const lib = require('./src/index.js')

const babelTranslationOptions = function(options) {
  return {
    plugins: [ [lib, options] ]
  }
}

const code = fs.readFileSync('./dist.js', 'utf8')
const a = transform(code, babelTranslationOptions({name: 'abc'}))

console.log(a.code)

