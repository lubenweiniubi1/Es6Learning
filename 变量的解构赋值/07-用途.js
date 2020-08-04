if (0) {
  //交换变量的值
  let x = 1
  let y = 2
  console.log(x, y)
  ;[x, y] = [y, x]
  console.log(x, y)
  //上面代码交换变量x和y的值，这样的写法不仅简洁，而且易读，语义非常清晰。
}
if (0) {
  //从函数返回多个值
  //函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。
  //有了解构赋值，取出这些值就非常方便。

  function example() {
    return [1, 2, 3]
  }
  let [a, b, c] = example()
  console.log(a, b, c)
  function example2() {
    return {
      foo: 1,
      bar: 2,
    }
  }
  let { foo, bar } = example2()
  console.log(foo, bar)
}
if (0) {
  //解构赋值可以方便地将一组参数与变量名对应起来。
  // 参数是一组有次序的值
  function f([x, y, z]) {
    //...
  }
  f([1, 2, 3])

  // 参数是一组无次序的值
  function f({ x, y, z }) {
    //...
  }
  f({ z: 3, y: 2, x: 1 })
}
if (0) {
  //提取JSON 数据 ，解构赋值对提取JSON对象中的数据，尤其有用。
  let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309],
  }
  let { id, status, data: number } = jsonData
  console.log(id, status, number)
  // 42, "OK", [867, 5309]
}
if (0) {
  //函数参数的默认值
  function ajax(
    url,
    {
      async = true,
      beforSend = function () {},
      //指定参数的默认值，就避免了在函数体内部再写
      //var foo = config.foo || 'default foo';这样的语句。
    }
  ) {}
}
if (1) {
  //历Map结构
  //任何部署了Iterator接口的对象，都可以用for...of循环遍历。
  //Map结构原生支持Iterator接口，配合变量的解构赋值，
  //获取键名和键值就非常方便。
  const mymp = new Map()
  mymp.set("first", "hello ")
  mymp.set("second", "world!")

  for (let [key, value] of mymp) {
    console.log(key + " is " + value)
  }

  // 如果只想获取键名，或者只想获取键值，可以写成下面这样。

  // 获取键名
  for (let [key] of map) {
    // ...
  }

  // 获取键值
  for (let [, value] of map) {
    // ...
  }
}
if (0) {
  //输入模块的指定方法
  //加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。
  const { SourceMapConsumer, SourceNode } = require("source-map")
}
