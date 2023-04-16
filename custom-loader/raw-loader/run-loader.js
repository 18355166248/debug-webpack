const { runLoaders } = require("loader-runner");
const path = require("path");
const fs = require("fs");

runLoaders(
  {
    resource: path.resolve(__dirname, "./src/demo.txt"),
    loaders: [
      {
        loader: path.resolve(__dirname, "./src/raw-loader"),
        options: {
          name: "test",
        },
      },
    ],
    context: { minimize: true },
    readResource: fs.readFile.bind(fs),
  },
  function (err, res) {
    if (err) {
      console.error(err);
      return;
    }

    console.log(res);
  }
);
