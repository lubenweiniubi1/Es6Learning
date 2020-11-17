/**constructor方法
 constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
constructor() {}

constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
 */
if (1) {
  class Foo {
    constructor() {
      return Object.create(null)
    }
  }
  console.log(new Foo() instanceof Foo) //false
}
//上面代码中，constructor函数返回一个全新的对象，结果导致实例对象不是Foo类的实例。

//类的构造函数，不使用new是没法调用的，会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。
if (0) {
  class Foo {
    constructor() {
      return Object.create(null)
    }
  }

  Foo()
  // TypeError: Class constructor Foo cannot be invoked without 'new'
}
