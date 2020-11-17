//不存在变量提升
//Class不存在变量提升（hoist），这一点与ES5完全不同。
if (0) {
  new Foo() // ReferenceError
  class Foo {}
}
//上面代码中，Foo类使用在前，定义在后，这样会报错，因为ES6不会把类的声明提升到代码头部。

//这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。
if (0) {
  {
    let Foo = class {}
    class Bar extends Foo {}
  }
}
//上面的代码不会报错，因为Bar继承Foo的时候，Foo已经有定义了。
//但是，如果存在class的提升，上面代码就会报错，因为class会被提升到代码头部，而let命令是不提升的，
//所以导致Bar继承Foo的时候，Foo还没有定义。

/**
Class表达式

与函数一样，类也可以使用表达式的形式定义。
 */
const MyClass = class Me {
  getClassName() {
    return Me.name
  }
}
//上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是MyClass而不是Me，
//Me只在Class的内部代码可用，指代当前类。
if (0) {
  let inst = new MyClass()
  console.log(inst.getClassName()) //Me
  Me.name // ReferenceError: Me is not defined
}
//上面代码表示，Me只在Class内部有定义。

//如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。
if (0) {
  const MyClass = class {}
}

//采用Class表达式，可以写出立即执行的Class。
if (1) {
  let person = new (class {
    constructor(name) {
      this.name = name
    }

    sayName() {
      console.log(this.name)
    }
  })('李四')

  person.sayName() //李四
}
//上面代码中，person是一个立即执行的类的实例。