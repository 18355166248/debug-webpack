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
