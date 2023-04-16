const parse = require("@babel/parser");
const fs = require("fs");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");

module.exports = {
  getAst: (path) => {
    const content = fs.readFileSync(path, "utf-8");
    return parse.parse(content, {
      sourceType: "module",
    });
  },
  getDenpendencies: (ast) => {
    const dependencies = [];
    traverse(ast, {
      ImportDeclaration: function ({ node }) {
        dependencies.push(node.source.value);
      },
    });

    return dependencies;
  },
  transform: (ast) => {
    const { code } = transformFromAst(ast, null); // 默认读取 babel.config.json

    return code;
  },
};
