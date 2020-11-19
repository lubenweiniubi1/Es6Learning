//与ES5一样，在Class内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
if (0) {
  class MyClass {
    constructor() {
      // ...
    }
    get prop() {
      return 'getter'
    }
    set prop(value) {
      console.log('setter: ' + value)
    }
  }
  let ins = new MyClass()
  console.log(ins.prop) //getter
  ins.prop = 12 //setter: 12
}
//上面代码中，prop属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。

// 存值函数和取值函数是设置在属性的descriptor对象上的。
if (0) {
  class CustomHTMLElement {
    constructor(element) {
      this.element = element
    }

    get html() {
      return this.element.innerHTML
    }

    set html(value) {
      this.element.innerHTML = value
    }
  }

  var descriptor = Object.getOwnPropertyDescriptor(
    CustomHTMLElement.prototype,
    'html'
  )
  console.log(descriptor)

  console.log('get' in descriptor) //get
  console.log('set' in descriptor) //set

  //如果指定的属性在指定的对象或其原型链中，则in 运算符返回true
}
// 上面代码中，存值函数和取值函数是定义在html属性的描述对象上面，这与ES5完全一致。

//如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。
if (1) {
  class Foo {
    constructor(...props) {
      this.args = props
    }
    *[Symbol.iterator]() {
      for (let arg of this.args) {
        yield arg
      }
    }
  }

  for (let x of new Foo('hello', 'word')) {
    console.log(x)
  }
  // hello
  // world
}
//上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个 Generator 函数。Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器