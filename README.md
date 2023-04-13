# debug webpack webpack-cli

因为执行的是 webpack 命令, webpack 命令中会查询是否有 webpack-cli, 所以这里需要修改下

将 webpack 下加载 webpack-cli 的命令改成 webpack-cli

```js
- const pkgPath = require.resolve(`${cli.package}/package.json`);
+ // TODO 修改点
+ const pathStr = path.resolve(
+   __dirname,
+   "../../",
+   "webpack-cli/packages/webpack-cli/package.json"
+ );
```

然后在 webpack-cli 内部也引用了 webpack 所以也需要修改下引入路径

webpack-cli/packages/webpack-cli/lib/webpack-cli.js
```js
async loadWebpack (handleError = true) {
  + // TODO 这里修改 webpack 引入路径
  +  const pathStr = path.resolve(
  +  __dirname,
  +  "../../../../",
  +  "webpack/lib"
  +  );
  -  // return this.tryRequireThenImport(WEBPACK_PACKAGE, handleError);
  +  return this.tryRequireThenImport(pathStr, handleError);
}
```
