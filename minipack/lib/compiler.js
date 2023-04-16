const { getAst, getDenpendencies, transform } = require("./parse");
const path = require("path");
const fs = require("fs");

module.exports = class Compiler {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }

  run() {
    const entryModule = this.buildModule(this.entry, true);
    this.modules.push(entryModule);
    this.modules.forEach((_module) => {
      _module.dependencies.forEach((dependency) => {
        this.modules.push(this.buildModule(dependency));
      });
    });

    this.emitFiles();
  }

  buildModule(fileName, isEntry) {
    let ast;
    if (isEntry) {
      ast = getAst(fileName);
    } else {
      const absolutePath = path.resolve(process.cwd(), "./src", fileName);
      ast = getAst(absolutePath);
    }

    return {
      fileName,
      dependencies: getDenpendencies(ast),
      source: transform(ast),
    };
  }

  emitFiles() {
    const outputPath = path.resolve(this.output.path, this.output.filename);
    let modules = "";

    this.modules.forEach((module) => {
      modules += `'${module.fileName}': function(require, module, exports) { ${module.source}},`;
    });
    const bundle = `(function(modules) {
      function require(filename) {
        var fn = modules[filename];
        var module = {exports: {}};

        fn(require, module, module.exports);

        return module.exports;
      }

      require('${this.entry}')
    })({${modules}})`;

    // console.log("bundle", bundle);

    fs.writeFileSync(outputPath, bundle, "utf-8");
  }
};
