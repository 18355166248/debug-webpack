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

引入了 webpack-dev-server 所以要改下引用

在 webpack-cli/packages/serve/src/index.ts

```js
  + const serverPath = path.resolve(__dirname, "../../../../", "webpack-dev-server/lib/Server");
  + const DevServer = require(serverPath);
  - // const DevServer = require(WEBPACK_DEV_SERVER_PACKAGE);
```

然后执行下 webpack-cli/package.json 下的 build 命令


## webpack-dev-server

初始化: webpack-dev-server/lib/Server.js
做了三件事:

+ 启动静态服务器
+ 开通长连接
+ 为打包产物注入HMR代码【使得客户端具备热更新能力】
