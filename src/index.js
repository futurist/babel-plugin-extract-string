var fs = require('fs')

function addToSet(arr, val) {
  var index = arr.indexOf(val)
  if(index<0) return arr.push(val)-1
  return index
}

module.exports = function ({types: t}) {
  return {
    visitor: {
      StringLiteral: {
        enter: function (path, state) {
          // filename : state.file.opts.filename
          if(/ObjectProperty/i.test(path.parent.type)) return
          // console.log(Object.keys(path), path.scope.path.node.type)
          var arr = state._store
          if(!Array.isArray(arr)) throw Error('cannot get store')
          var name = state.opts.name
          var str = path.node.value
          if(!name || !str || str.trim()=='use strict') return
          var index = addToSet(arr, str)
          path.replaceWith(t.memberExpression(t.identifier(name), t.numericLiteral(index), true))
        }
      },
      Program: {
        enter: function (path, state) {
          state._store = state._store || []
        },
        exit: function (path, state) {
          state.file.metadata._store = state._store
          var file = state.opts.file
          if(!file) return
          fs.writeFileSync(file, JSON.stringify(state._store), 'utf8')
        }
      }
    }
  }
}
