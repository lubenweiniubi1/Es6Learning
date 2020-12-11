/**
bind() 方法创建一个新的函数，在 bind() 被调用时，
这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
 */
if (0) {
  const modules = {
    x: 42,
    getX: function () {
      // console.log(this) //Object [global]

      return this.x
    },
  }

  const unboundGetX = modules.getX

  // The function gets invoked at the global scope
  console.log(unboundGetX()) //undefined

  const boundGetx = unboundGetX.bind(modules)
  console.log(Reflect.ownKeys(boundGetx))

  console.log(boundGetx())
}
/**
thisArg
调用绑定函数时作为 this 参数传递给目标函数的值。

如果使用new运算符构造绑定函数，则忽略该值。当使用 bind 在 setTimeout 中创建一个函数（作为回调提供）时，
作为 thisArg 传递的任何原始值都将转换为 object。
如果 bind 函数的参数列表为空，或者thisArg是null或undefined，执行作用域的 this 将被视为新函数的 thisArg。

arg1, arg2, ...
当目标函数被调用时，被预置入绑定函数的参数列表中的参数。
 */

/**
bind() 函数会创建一个新的绑定函数（bound function，BF）。
绑定函数是一个 exotic function object（怪异函数对象，ECMAScript 2015 中的术语），它包装了原函数对象。
调用绑定函数通常会导致执行包装函数。

绑定函数具有以下内部属性：
[[BoundTargetFunction]] - 包装的函数对象
[[BoundThis]] - 在调用包装函数时始终作为 this 值传递的值。
[[BoundArguments]] - 列表，在对包装函数做任何调用都会优先用列表元素填充参数列表。
[[Call]] - 执行与此对象关联的代码。通过函数调用表达式调用。内部方法的参数是一个this值和一个包含通过调用表达式传递给函数的参数的列表。
当调用绑定函数时，它调用 [[BoundTargetFunction]] 上的内部方法 [[Call]]，就像这样 Call(boundThis, args)。其中，boundThis 是 [[BoundThis]]，args 是 [[BoundArguments]] 加上通过函数调用传入的参数列表。

绑定函数也可以使用 new 运算符构造，它会表现为目标函数已经被构建完毕了似的。提供的 this 值会被忽略，但前置参数仍会提供给模拟函数。
  */

//创建绑定函数
// bind() 最简单的用法是创建一个函数，不论怎么调用，这个函数都有同样的 this 值。
//JavaScript新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，期望方法中的 this 是原来的对象（比如在回调中传入这个方法）。
//如果不做特殊处理的话，一般会丢失原来的对象。基于这个函数，用原始的对象创建一个绑定函数，巧妙地解决了这个问题：

if (1) {
  globalThis.x = 9 // 在浏览器中，this 指向全局的 "window" 对象
  var module = {
    x: 81,
    getX: function () {
      return this.x
    },
  }

  console.log(module.getX()) // 81

  var retrieveX = module.getX

  console.log(retrieveX())

  // 返回 9 - 因为函数是在全局作用域中调用的

  // 创建一个新函数，把 'this' 绑定到 module 对象
  // 新手可能会将全局变量 x 与 module 的属性 x 混淆
  var boundGetX = retrieveX.bind(module)

  console.log(boundGetX()) // 81
}

//