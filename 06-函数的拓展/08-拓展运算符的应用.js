//（1）合并数组
//扩展运算符提供了数组合并的新写法。
if (0) {
  const more = [3, 4, 5]
  //es5
  console.log([1, 2].concat(more)) //[ 1, 2, 3, 4, 5 ]
  //ES6
  console.log([1, 2, ...more]) //[ 1, 2, 3, 4, 5 ]
}
if (0) {
  var arr1 = ["a", "b"]
  var arr2 = ["c"]
  var arr3 = ["d", "e"]

  //es5 数组合并
  console.log(arr1.concat(arr2, arr3)) //[ 'a', 'b', 'c', 'd', 'e' ]

  //ES6数组合并
  console.log([...arr1, ...arr2, ...arr3]) //[ 'a', 'b', 'c', 'd', 'e' ]
}

//与解构赋值结合
if (0) {
  let list = [1, 2, 3, 4, 5]
  //扩展运算符可以与解构赋值结合起来，用于生成数组。

  //ES5
  const a = list[0]
  const b = list.slice(1)
  console.log(a) //1
  console.log(b) //[ 2, 3, 4, 5 ]

  //ES6
  const [c, ...d] = list
  console.log(c, d) //1 [ 2, 3, 4, 5 ]
}
//例子
if (0) {
  const [first, ...rest] = [1, 2, 3, 4, 5]
  console.log(first, rest) //1 [ 2, 3, 4, 5 ]

  const [f1, ...r1] = []
  console.log(f1, r1) //undefined []

  const [f2, ...r2] = ["foo"]
  console.log(f2, r2) //foo []

  //如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
  // const [...butLast,last] = [1,2,3,3,3,3,3] //Rest element must be last element
}

//函数返回值
if (0) {
  //JavaScript的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。扩展运算符提供了解决这个问题的一种变通方法。
  // var dateFields = readDateFields(database);
  // var d = new Date(...dateFields);
  // 上面代码从数据库取出一行数据，通过扩展运算符，直接将其传入构造函数Date。
}

//字符串
if (0) {
  //扩展运算符还可以将字符串转为真正的数组。
  console.log([..."hello"]) //[ 'h', 'e', 'l', 'l', 'o' ]

  //上面的写法，有一个重要的好处，那就是能够正确识别32位的Unicode字符。
  console.log("x\uD83D\uDE80y".length) // 4
  console.log([..."x\uD83D\uDE80y"].length) //3

  //上面代码的第一种写法，JavaScript会将32位Unicode字符，识别为2个字符，采用扩展运算符就没有这个问题。
  //因此，正确返回字符串长度的函数，可以像下面这样写。
  const getTrueLength = (str) => {
    return [...str].length
  }
  console.log(getTrueLength("x\uD83D\uDE80y")) //3

  //凡是涉及到操作32位Unicode字符的函数，都有这个问题。因此，最好都用扩展运算符改写。
  let str = "x\uD83D\uDE80y"
  str.split("\uD83D\uDE80").reverse().join("\uD83D\uDE80")
  console.log(str)

  console.log([...str].reverse().join("\uD83D\uDE80"))
  console.log(str)
}

//（5）实现了Iterator接口的对象
if (0) {
  //任何Iterator接口的对象，都可以用扩展运算符转为真正的数组。
  /*
  var nodeList = document.querySelectorAll('div');
  var array = [...nodeList];
  */

  //上面代码中，querySelectorAll方法返回的是一个nodeList对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了Iterator接口。

  //对于那些没有部署Iterator接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。
  let arrLike = {
    0: "a",
    1: "b",
    2: "c",
    length: 3,
  }
  // let arr = [...arrLike] //TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))

  //上面代码中，arrayLike是一个类似数组的对象，但是没有部署Iterator接口，
  //扩展运算符就会报错。这时，可以改为使用Array.from方法将arrayLike转为真正的数组。
}

//（6）Map和Set结构，Generator函数
if (1) {
  //扩展运算符内部调用的是数据结构的Iterator接口，因此只要具有Iterator接口的对象，都可以使用扩展运算符，比如Map结构。
  let map = new Map([
    [1, "one"],
    [22, "two"],
    [3, "three"],
  ])
  console.log([...map.keys()]) //[ 1, 22, 3 ]

  //Generator函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。
  const go = function* () {
    yield 1
    yield 2
    yield 3
  }
  console.log([...go()]) //[ 1, 2, 3 ]

  //上面代码中，变量go是一个Generator函数，执行后返回的是一个遍历器对象，
  //对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。

  //如果对没有iterator接口的对象，使用扩展运算符，将会报错。
  if (0) {
    const  obj = { a: 1, b: 2 }
    let arr = [...obj] // TypeError: Cannot spread non-iterable object
  }
}
