import fs from 'fs'

export default function ({types: t}) {
  var arr = []
  return {
    visitor: {
      StringLiteral: {
        enter (path, state) {
          // console.log(Object.keys(path), path.scope.path.node.type)
          var programNode = path.scope.path.node
          var arr = programNode._extractStringArr
          if(!Array.isArray(arr)) throw Error('cannot get program node store')
          var name = state.opts.name
          if(!name) return
          arr.push(path.node.value)
          path.replaceWith(t.memberExpression(t.identifier(name), t.numericLiteral(arr.length-1), true))
        }
      },
      Program: {
        enter (path, state) {
          path.node._extractStringArr = []
        },
        exit (path, state) {
          var file = state.opts.file
          if(!file) return
          fs.writeFileSync(file, JSON.stringify(path.node._extractStringArr), 'utf8')
        }
      }
    }
  }
}
