//stage3了
//目前，有一个提案，为class加了私有属性。方法是在属性名之前，使用#表示。
if (0) {
  class Point {
    #x
    constructor(x = 0) {
      this.#x = +x
    }
    get x() {
      return this.#x
    }

    set x(value) {
      this.#x = +value
    }
  }
  new Point()
}
//面代码中，#x就表示私有属性x，在Point类之外是读取不到这个属性的。还可以看到，私有属性与实例的属性是可以同名的（比如，#x与get x()）。
//私有属性可以指定初始值，在构造函数执行时进行初始化。
if (0) {
  class Point {
    #x = 0
    constructor() {
      console.log(this.#x) //0
    }
  }
  new Point()
}
//之所以要引入一个新的前缀#表示私有属性，而没有采用private关键字，是因为 JavaScript 是一门动态语言，使用独立的符号似乎是唯一的可靠方法，能够准确地区分一种属性是私有属性。
//另外，Ruby 语言使用@表示私有属性，ES6 没有用这个符号而使用#，是因为@已经被留给了 Decorator。

//该提案只规定了私有属性的写法。但是，很自然地，它也可以用来写私有方法。
if (1) {
  class Foo {
    #a
    #b

    #sum = () => {
      return this.#a + this.#b
    }
    printSum() {
      console.log(this.#sum())
    }
    constructor(a, b) {
      this.#a = a
      this.#b = b
    }
  }
  const foo = new Foo(1, 2)
//    console.log(foo.#a) //SyntaxError: Private field '#a' must be declared in an enclosing class
  foo.printSum() //3
}
