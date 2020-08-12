/**
 * Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）
 * 和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。
 */

if (0) {
  let arrayLike = {
    "0": "a",
    "1": "b",
    "2": "c",
    length: 3,
  }
  //ES5写法
  var arr1 = [].slice.call(arrayLike) //这是什么。。
  console.log(arr1) //[ 'a', 'b', 'c' ]

  //ES6写法
  var arr2 = Array.from(arrayLike)
  console.log(arr2) //[ 'a', 'b', 'c' ]
}

//实际应用中，常见的类似数组的对象是DOM操作返回的NodeList集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。
if (0) {
  let ps = document.querySelectorAll("p")
  Array.from(ps).forEach(function (p) {
    console.log(p)
  })
}
if (0) {
  function foo() {
    console.log(arguments) //[Arguments] { '0': 1, '1': 2, '2': 3 }
    const args = Array.from(arguments)
    console.log(args) //[ 1, 2, 3 ]
  }
  foo(1, 2, 3)
}
//只要是部署了Iterator接口的数据结构，Array.from都能将其转为数组。
if (1) {
  var a = Array.from("hello")
  console.log(a)//[ 'h', 'e', 'l', 'l', 'o' ]
  var nameSet = new Set(['a','b'])
  console.log(nameSet)//Set { 'a', 'b' }
  a = Array.from(nameSet)
  console.log(a)//[ 'a', 'b' ]
}
//如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组。
if (1) {
}
if (1) {
}
if (1) {
}
if (1) {
}
if (1) {
}
