//静态属性指的是Class本身的属性，即Class.propname，而不是定义在实例对象（this）上的属性。
if (0) {
  class Foo {
    static saber() {}
  }
  Foo.prop = 1
  console.log(Foo.prop) //1

  console.log(Foo) //[Function: Foo] { prop: 1 }
  console.log(Foo.prototype.constructor) //[Function: Foo] { prop: 1 }
  console.log(Object.getOwnPropertyDescriptor(Foo, 'saber'))
  /**
{
  value: [Function: saber],
  writable: true,
  enumerable: false,
  configurable: true
}
   */
}
//也就是说静态属性是定义在构造函数上的属性。上面的写法为Foo类定义了一个静态属性prop。

//目前，只有这种写法可行，因为ES6明确规定，Class内部只有静态方法，没有静态属性。
if (0) {
  // 以下两种写法都无效
  //   class Foo {
  //     // 写法一
  //     prop: 2
  //     // 写法二
  //     static prop: 2
  //   }
  //   Foo.prop // undefined
}

/*
ES7有一个静态属性的提案，目前Babel转码器支持。

 这个提案对实例属性和静态属性，都规定了新的写法。
 */
//（1）类的实例属性

// 类的实例属性可以用等式，写入类的定义之中。
if (0) {
  class MyClass {
    constructor() {
      console.log(this.myProp) // 42
    }
    myProp = 42
  }
  new MyClass()
}
//上面代码中，myProp就是MyClass的实例属性。在MyClass的实例上，可以读取这个属性。

//以前，我们定义实例属性，只能写在类的constructor方法里面
if (0) {
  class ReactCounter extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        count: 0,
      }
    }
  }
}
//上面代码中，构造方法constructor里面，定义了this.state属性。

//有了新的写法以后，可以不在constructor方法里面定义。
if (0) {
  class ReactCounter extends React.Component {
    state = {
      count: 0,
    }
  }
}

//这种写法比以前更清晰。

// 为了可读性的目的，对于那些在constructor里面已经定义的实例属性，新写法允许直接列出。
if (0) {
  class ReactCounter extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        count: 0,
      }
    }
    state
  }
}

//（2）类的静态属性
// 类的静态属性只要在上面的实例属性写法前面，加上static关键字就可以了。
if (0) {
  class MyClass {
    static myStaticProps = 42
    constructor() {
      console.log(MyClass.myStaticProps) //42
    }
  }
  new MyClass()
}
//同样的，这个新写法大大方便了静态属性的表达。
if (0) {
  // 老写法
  class Foo {}
  Foo.prop = 1

  // 新写法
  class Foo {
    static prop = 1
  }
}
//上面代码中，老写法的静态属性定义在类的外部。整个类生成以后，再生成静态属性。这样让人很容易忽略这个静态属性，也不符合相关代码应该放在一起的代码组织原则。
//另外，新写法是显式声明（declarative），而不是赋值处理，语义更好。
