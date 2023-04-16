module.exports = function (source) {
  console.log(this.async, this.callback);
  const json = JSON.stringify(source)
    .replace("foo", "diudiu")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

  return `export default ${json}`;
};
