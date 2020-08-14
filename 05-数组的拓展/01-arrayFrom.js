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
if (0) {
  var a = Array.from("hello")
  console.log(a) //[ 'h', 'e', 'l', 'l', 'o' ]
  var nameSet = new Set(["a", "b"])
  console.log(nameSet) //Set { 'a', 'b' }
  a = Array.from(nameSet)
  console.log(a) //[ 'a', 'b' ]
}
//如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组。
if (0) {
  var a = [1, 2, 3]
  var b = Array.from(a)
  console.log(a === b) //false
}
//值得提醒的是，扩展运算符（...）也可以将某些数据结构转为数组。
if (0) {
  function foo() {
    var args = [...arguments]
    console.log(args) //[ 12, 3423423 ]
  }
  foo(12, 3423423)
}
/**
 * 扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。
 * Array.from方法则是还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有length属性。
 * 因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。
 */
if (0) {
  var t = { length: 3 }
  console.log(Array.from(t)) //[ undefined, undefined, undefined ]
  console.log([...t]) //t is not iterable
  //上面代码中，Array.from返回了一个具有三个成员的数组，每个位置的值都是undefined。扩展运算符转换不了这个对象。
}

//Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
if (0) {
  var t = { "0": 2, "1": 2, "2": 4, length: 3 }
  console.log(Array.from(t, (x) => x ** 2)) //[ 4, 4, 16 ]
  console.log(Array.from([1, , 2, , 3], (n) => n || 0))
}
if (0) {
  function typeOf() {
    return Array.from(arguments, (value) => typeof value)
  }
  console.log(typeOf(null, [], NaN))
}
/**
 * Array.from()可以将各种值转为真正的数组，并且还提供map功能。
 * 这实际上意味着，只要有一个原始的数据结构，你就可以先对它的值进行处理，
 * 然后转成规范的数组结构，进而就可以使用数量众多的数组方法。
 */
if (1) {
  console.log(Array.from({ length: 2 }, () => "jack")) //[ 'jack', 'jack' ]
  //上面代码中，Array.from的第一个参数指定了第二个参数运行的次数。这种特性可以让该方法的用法变得非常灵活。
}
//Array.from()的另一个应用是，将字符串转为数组，然后返回字符串的长度。
//因为它能正确处理各种Unicode字符，可以避免JavaScript将大于\uFFFF的Unicode字符，算作两个字符的bug。
if (1) {
  function countSymbols(string) {
    return Array.from(string).length
  }
  console.log(countSymbols("𠮷")) //1
  console.log("𠮷".length) //2
}
if (1) {
}
if (1) {
}
