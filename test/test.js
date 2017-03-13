import { transform } from 'babel-core'
import assert from 'assert'
import fs from 'fs'
import lib from '../'

const babelTranslationOptions = function(options) {
  return {
    plugins: [ [lib, options] ]
  }
}

describe('Babel Plugin test', function () {
  it('test string', function () {
    const code = `var d = 'aaa'; d+='bbb';`
    const a = transform(code, babelTranslationOptions({name: 'abc'}))
    assert.equal(a.code, 'var d = abc[0];d += abc[1];')
    assert.deepEqual(a.ast.program._extractStringArr, [ 'aaa', 'bbb' ])
  })
  it('test string saved to file', function () {
    const file = 'abc.json'
    const code = `var d = 'aaa'; d+='bbb';`
    const a = transform(code, babelTranslationOptions({name: 'abc', file}))
    assert.equal(a.code, 'var d = abc[0];d += abc[1];')
    assert.deepEqual(fs.readFileSync(file, 'utf8'), JSON.stringify([ 'aaa', 'bbb' ]))
    fs.unlink(file, e=>e)
  })
})
