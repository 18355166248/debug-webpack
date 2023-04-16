const { getAst, getDenpendencies, transform } = require("../lib/parse");
const path = require("path");

const ast = getAst(path.resolve(__dirname, "../src/index.js"));
const dependencies = getDenpendencies(ast);
const transformCode = transform(ast);
console.log(transformCode);
