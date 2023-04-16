const Compiler = require("./compiler");
const options = require("../minipack.config");

const compiler = new Compiler(options).run();
