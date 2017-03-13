import { transform } from 'babel-core'
import assert from 'assert'
import lib from '../'

const babelTranslationOptions = {
  plugins: [
		[
      lib,
      {
        name: 'abc',
      }
    ]
  ]
}

describe('Babel Plugin test', function () {
  it('test string', function () {
    const code = `var d = 'aaa'; d+='bbb';`
    const a = transform(code, babelTranslationOptions)
    assert.equal(a.code, 'var d = abc[0];d += abc[1];')
    assert.deepEqual(a.ast.program._resultArr, [ 'aaa', 'bbb' ])
  })
})
