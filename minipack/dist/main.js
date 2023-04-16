(function(modules) {
      function require(filename) {
        var fn = modules[filename];
        var module = {exports: {}};

        fn(require, module, module.exports);

        return module.exports;
      }

      require('E:\Studying\Code\webpack\debug-webpack\minipack\src\index.js')
    })({'E:\Studying\Code\webpack\debug-webpack\minipack\src\index.js': function(require, module, exports) { "use strict";

var _outModule = require("./out.module.js");
var res = (0, _outModule.out)("mini-webpack");
document.write(res);},'./out.module.js': function(require, module, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.out = out;
function out(name) {
  return name + "----out";
}},})