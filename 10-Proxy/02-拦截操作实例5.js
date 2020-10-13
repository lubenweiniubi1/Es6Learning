// preventExtensions()
// preventExtensions方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。

// 这个方法有一个限制，只有目标对象不可扩展时（即Object.isExtensible(proxy)为false），proxy.preventExtensions才能返回true，否则会报错。
if (0) {
  const target = {}
  const p = new Proxy(target, {
    preventExtensions: function (target) {
      return true
    },
  })
  Object.preventExtensions(p) // 报错
}
//上面代码中，proxy.preventExtensions方法返回true，但这时Object.isExtensible(proxy)会返回true，因此报错。

// 为了防止出现这个问题，通常要在proxy.preventExtensions方法里面，调用一次Object.preventExtensions。
var p = new Proxy(
  {},
  {
    preventExtensions: function (target) {
      console.log("called")
      Object.preventExtensions(target)
      return true
    },
  }
)

Object.preventExtensions(p)
// "called"
// true

//setPrototypeOf()
// setPrototypeOf方法主要用来拦截Object.setPrototypeOf方法。

// 下面是一个例子。
if (0) {
  var handler = {
    setPrototypeOf(target, proto) {
      throw new Error("Changing the prototype is forbidden")
    },
  }
  var proto = {}
  var target = function () {}
  var proxy = new Proxy(target, handler)
  Object.setPrototypeOf(proxy, proto)
  // Error: Changing the prototype is forbidden
}
// 上面代码中，只要修改target的原型对象，就会报错。

// 注意，该方法只能返回布尔值，否则会被自动转为布尔值。另外，如果目标对象不可扩展（extensible），setPrototypeOf方法不得改变目标对象的原型。

//Proxy.revocable()
// Proxy.revocable方法返回一个可取消的 Proxy 实例。
if (1) {
  let target = {}
  let handler = {}

  let { proxy, revoke } = Proxy.revocable(target, handler)

  proxy.foo = 123
  proxy.foo // 123

  revoke()
  proxy.foo // TypeError: Revoked
}
// Proxy.revocable方法返回一个对象，该对象的proxy属性是Proxy实例，revoke属性是一个函数，可以取消Proxy实例。上面代码中，当执行revoke函数之后，再访问Proxy实例，就会抛出一个错误。

// Proxy.revocable的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。
