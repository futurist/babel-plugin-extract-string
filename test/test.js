import { transform } from 'babel-core'
import assert from 'assert'
import fs from 'fs'
import lib from '../src/index.js'

const babelTranslationOptions = function(options) {
  return {
    plugins: [ [lib, options] ]
  }
}

describe('Babel Plugin test', function () {
  it('test string', function () {
    const code = `var d = 'aaa'; d+='bbb';`
    const arr = []
    var a = transform(code, babelTranslationOptions({name: 'abc'}))
    assert.equal(a.code, 'var d = abc[0];d += abc[1];')
    assert.deepEqual(a.metadata._store, [ 'aaa', 'bbb' ])

    // dedupe strings
    var a = transform(`var d ='dd'; b='aa'; c='dd';`, babelTranslationOptions({name: 'abc'}))
    assert.equal(a.code, `var d = abc[0];b = abc[1];c = abc[0];`)
    assert.deepEqual(a.metadata._store, [ 'dd', 'aa' ])

    // empty strings
    var a = transform(`var d ='dd'; b=''; c='dd';`, babelTranslationOptions({name: 'abc'}))
    assert.equal(a.code, `var d = abc[0];b = '';c = abc[0];`)
    assert.deepEqual(a.metadata._store, [ 'dd' ])

    // don't touch ObjectProperty
    var a = transform(`var d = {'aaa': '123'};`, babelTranslationOptions({name: 'abc'}))
    assert.equal(a.code, `var d = { 'aaa': abc[0] };`)
    assert.deepEqual(a.metadata._store, ['123'])
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
