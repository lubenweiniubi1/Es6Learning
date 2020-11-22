/**
修饰器（Decorator）是一个函数，用来修改类的行为。这是ES7的一个提案，目前Babel转码器已经支持。

修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，修饰器能在编译阶段运行代码。 （发现没有new Class都运行了）

node 直接运行是会报错的，因为这只是个提案 ，需要babel插件
npm i @babel/cli @babel/core @babel/plugin-proposal-decorators @babel/preset-env

npx babel 01-decorator.js --out-dir ./babelScripts
 */
if (0) {
  function testable(target) {
    target.isTestable = true
  }

  // @testable
  class MytestableClass {}

  console.log(testable(MytestableClass)) //undefined

  console.log(MytestableClass.isTestable) //true
}
//上面代码中，@testable就是一个修饰器。它修改了MyTestableClass这个类的行为，为它加上了静态属性isTestable。

// 基本上，修饰器的行为就是下面这样。
if (0) {
  @decorator
  class A {}

  //等同于
  class A1 {}
  A = decorator(A1) || A1
}
//也就是说，修饰器本质就是编译时执行的函数。

// 修饰器函数的第一个参数，就是所要修饰的目标类。
if (0) {
  function testable(target) {
    // ...
  }
}
//上面代码中，testable函数的参数target，就是会被修饰的类。

//如果觉得一个参数不够用，可以在修饰器外面再封装一层函数。
if (0) {
  function testable(isTestable) {
    return function (target) {
      target.isTestable = isTestable
    }
  }

  @testable(true)
  class MytestableClass {}

  @testable(false)
  class Myclass {}

  console.log(MytestableClass.isTestable) //true
  console.log(Myclass.isTestable) //false
}
//上面代码中，修饰器testable可以接受参数，这就等于可以修改修饰器的行为。

//前面的例子是为类添加一个静态属性，如果想添加实例属性，可以通过目标类的prototype对象操作
if (0) {
  function testable(target) {
    target.prototype.isTestable = 1
  }

  @testable
  class MyTestableClass {}

  console.log(new MyTestableClass().isTestable) //1
}
//上面代码中，修饰器函数testable是在目标类的prototype对象上添加属性，因此就可以在实例上调用。

//下面是另外一个例子。
if (1) {
  function mixins(...list) {
    return function (target) {
      Object.assign(target.prototype, ...list)
    }
  }

  const Foo = {
    foo() {
      console.log("foo")
    },
  }

  @mixins(Foo)
  class MyClass {}

  let obj = new MyClass()
  obj.foo() //foo
}
//上面代码通过修饰器mixins，把Foo类的方法添加到了MyClass的实例上面。可以用Object.assign()模拟这个功能。
if (0) {
  const Foo = {
    foo() {
      console.log("foo")
    },
  }

  class MyClass {}

  Object.assign(MyClass.prototype, Foo)

  let obj = new MyClass()
  obj.foo() // 'foo'
}
