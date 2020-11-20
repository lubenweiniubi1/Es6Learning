/**
new是从构造函数生成实例的命令。ES6为new命令引入了一个new.target属性，
（在构造函数中）返回new命令作用于的那个构造函数。
如果构造函数不是通过new命令调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。
 */
if (0) {
  function Person(name) {
    if (new.target !== undefined) {
      this.name = name
    } else {
      throw new Error("必须使用new生成实例")
    }
  }

  //另一种写法
  function Person2(name) {
    if (new.target === Person) {
      this.name = name
    } else {
      throw new Error("必须使用new生成实例")
    }
  }
  const p = new Person("张三")
  var notAPerson = Person.call(p, "张三") // 报错 Error: 必须使用new生成实例
}

//上面代码确保构造函数只能通过new命令调用。

// Class内部调用new.target，返回当前Class。
if (0) {
  class Rectangle {
    constructor(length, width) {
      console.log(new.target === Rectangle)
      this.length = length
      this.width = width
    }
  }
  new Rectangle() //true
}

//需要注意的是，子类继承父类时，new.target会返回子类。
if (0) {
  class Rectangle {
    constructor(length, width) {
      console.log(new.target === Rectangle)
    }
  }
  class Square extends Rectangle {
    constructor() {
      super()
    }
  }
  new Square() //false
}
//上面代码中，new.target会返回子类。

//利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。
if (1) {
  class Shape {
    constructor() {
      if (new.target === Shape) {
        throw new Error("本类不能实例化")
      }
    }
  }

  class Rectangle extends Shape {
    constructor(length, width) {
      super()
    }
  }
  const x = new Rectangle() //正确
  const y = new Shape() //Error: 本类不能实例化
}
//上面代码中，Shape类不能被实例化，只能用于继承。

// 注意，在函数外部，使用new.target会报错。