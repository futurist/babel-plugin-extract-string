var fs = require('fs')

module.exports = function ({types: t}) {
  return {
    visitor: {
      StringLiteral: {
        enter: function (path, state) {
          if(/ObjectProperty/i.test(path.parent.type)) return
          // console.log(Object.keys(path), path.scope.path.node.type)
          var arr = state.opts.store
          if(!Array.isArray(arr)) throw Error('cannot get store')
          var name = state.opts.name
          var str = path.node.value
          if(!name || str=='use strict') return
          arr.push(str)
          path.replaceWith(t.memberExpression(t.identifier(name), t.numericLiteral(arr.length-1), true))
        }
      },
      Program: {
        enter: function (path, state) {
          state.opts.store = state.opts.store || []
        },
        exit: function (path, state) {
          var file = state.opts.file
          if(!file) return
          fs.writeFileSync(file, JSON.stringify(state.opts.store), 'utf8')
        }
      }
    }
  }
}
