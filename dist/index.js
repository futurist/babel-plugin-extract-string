'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = function (_ref) {
  var t = _ref.types;

  var arr = [];
  return {
    visitor: {
      StringLiteral: {
        enter: function enter(path, state) {
          // console.log(Object.keys(path), path.scope.path.node.type)
          var programNode = path.scope.path.node;
          var arr = programNode._extractStringArr;
          if (!Array.isArray(arr)) throw Error('cannot get program node store');
          var name = state.opts.name;
          if (!name) return;
          arr.push(path.node.value);
          path.replaceWith(t.memberExpression(t.identifier(name), t.numericLiteral(arr.length - 1), true));
        }
      },
      Program: {
        enter: function enter(path, state) {
          path.node._extractStringArr = [];
        },
        exit: function exit(path, state) {
          var file = state.opts.file;
          if (!file) return;
          _fs2.default.writeFileSync(file, (0, _stringify2.default)(path.node._extractStringArr), 'utf8');
        }
      }
    }
  };
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }