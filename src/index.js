import "./b";

const a = "a";

function getA() {
  return a;
}

console.log(2333);

if (module.hot) {
  module.hot.accept("./b.js", () => {
    console.log("index.js 捕获到 b.js 的变化...");
  });
}
