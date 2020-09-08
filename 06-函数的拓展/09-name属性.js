//函数的name属性，返回该函数的函数名。

if (0) {
  function foo() {}
  console.log(foo.name) //foo
}
if (0) {
  //     这个属性早就被浏览器广泛支持，但是直到 ES6，才将其写入了标准。
  // 需要注意的是，ES6 对这个属性的行为做出了一些修改。
  //如果将一个匿名函数赋值给一个变量，ES5 的name属性，会返回空字符串，
  //而 ES6 的name属性会返回实际的函数名。
  const f = function () {}
  console.log(f.name) //
}
if (1) {
  //如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的name属性都返回这个具名函数原本的名字。
  const a = function b() {}
  console.log(a.name) //b
}
//Function构造函数返回的函数实例，name属性的值为anonymous。
if (1) {
  console.log(new Function().name) //anonymous
}
//bind返回的函数，name属性值会加上bound前缀
if (1) {
  console.log(function () {}.bind({}).name) //bound
  const foo = () => {}
  console.log(foo.bind({}).name) //bound foo
}
