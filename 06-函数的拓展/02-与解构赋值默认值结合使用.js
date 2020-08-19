//参数默认值可以与解构赋值的默认值，结合起来使用。
if (0) {
  function foo({ x, y = 5 }) {
    console.log(x, y)
  }
  foo({}) //undefined 5
  foo({ x: 1 }) //1 5
  foo({ x: 2, y: 2 }) //2 2
  foo(null) //err
}
//上面代码使用了对象的解构赋值默认值，而没有使用函数参数的默认值。
//只有当函数foo的参数是一个对象时，变量x和y才会通过解构赋值而生成。
//如果函数foo调用时参数不是对象，变量x和y就不会生成，从而报错。如果参数对象没有y属性，y的默认值5才会生效。

//下面是另一个对象的解构赋值默认值的例子。
if (0) {
  function fetch(url, { body = "", method = "GET", headers = {} }) {
    console.log(method)
  }
  fetch("http://example.com", {}) //get
  fetch("http://example.com") //err
}
//上面代码中，如果函数fetch的第二个参数是一个对象，就可以为它的三个属性设置默认值。
//上面的写法不能省略第二个参数，如果结合函数参数的默认值，就可以省略第二个参数。这时，就出现了双重默认值。
if (1) {
  function fetch(url, { method = "GET" } = {}) {
    console.log(method)
  }
  fetch() //get
}
//上面代码中，函数fetch没有第二个参数时，函数参数的默认值就会生效，然后才是解构赋值的默认值生效，变量method才会取到默认值GET。

if (1) {
  function m1({ x = 0, y = 0 } = {}) {
    console.log([x, y])
  }
  function m2({ x, y } = { x: 0, y: 0 }) {
    console.log([x, y])
  }
  m1() // [0, 0]
  m2() // [0, 0]

  // x和y都有值的情况
  m1({ x: 3, y: 8 }) // [3, 8]
  m2({ x: 3, y: 8 }) // [3, 8]

  
}
//上面两种写法都对函数的参数设定了默认值，区别是写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；
//写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。
