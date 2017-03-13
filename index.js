var fs = require('fs')

export default function ({types: t}) {
  var arr = []
  return {
    visitor: {
      StringLiteral: {
        enter (path, state) {
          var name = state.opts.name
          if(!name) return
          arr.push(path.node.value)
          path.replaceWith(t.memberExpression(t.identifier(name), t.numericLiteral(arr.length-1), true))
        }
      },
      Program: {
        exit (path, state) {
          path.node._resultArr = arr
        }
      }
    }
  }
}
