/**
 * __proto__属性
   
   __proto__属性（前后各两个下划线），用来读取或设置当前对象的prototype对象。
   目前，所有浏览器（包括 IE11）都部署了这个属性。
 */
//es6写法
var obj = {
  method: function () {},
}
var someOtherObj = {}
obj.__proto__ = someOtherObj

//es5写法
var obj = Object.create(someOtherObj)
obj.method = function () {}

/*
Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。

propertiesObject
可选。如果没有指定为 undefined，
则是要添加到新创建对象的不可枚举（默认）属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。
这些属性对应Object.defineProperties()的第二个参数。

const person = {
  isHuman: false,
  printIntroduction: function() {
    return `My name is ${this.name}. Am I human? ${this.isHuman}`
  }
};

const me = Object.create(person);

me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntroduction();
 
"My name is Matthew. Am I human? true"
*/

/*该属性没有写入 ES6 的正文，而是写入了附录，原因是__proto__前后的双下划线，说明它本质上是一个内部属性，而不是一个正式的对外的 API，
//只是由于浏览器广泛支持，才被加入了 ES6。
//标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的。
//因此，无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，
//而是使用下面的Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替。*/

//正确写法

//在实现上，__proto__调用的是Object.prototype.__proto__，具体实现如下。
Object.defineProperty(Object.prototype, "__proto__", {
  //这里是存取描述符
  get() {
    let _thisObj = Object(this)
    return Object.getPrototypeOf(_thisObj)
  },
  set(proto) {
    if (this === undefined || this === null) {
      throw new TypeError()
    }
    if (!isObject(this)) {
      return undefined
    }
    if (!isObject(proto)) {
      return undefined
    }
    let status = Reflect.setPrototypeOf(this, proto)
    if (!status) {
      throw new TypeError()
    }
  },
})
function isObject(value) {
  return Object(value) === value
}

/**
   Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
   Object.defineProperty(obj, prop, descriptor)

   参数
   obj
     要定义属性的对象。
   prop
     要定义或修改的属性的名称或 Symbol 。
   descriptor
     要定义或修改的属性描述符。
  
  该方法允许精确地添加或修改对象的属性。
  通过赋值操作添加的普通属性是可枚举的，在枚举对象属性时会被枚举到（for...in 或 Object.keys 方法），
  可以改变这些属性的值，也可以删除这些属性。
  这个方法允许修改默认的额外选项（或配置）。
  默认情况下，使用 Object.defineProperty() 添加的属性值是不可修改（immutable）的。

  对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。
  数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的。
  存取描述符是由 getter 函数和 setter 函数所描述的属性。
  一个描述符只能是这两者其中之一；不能同时是两者。

  这两种描述符都是对象。它们共享以下可选键值（默认值是指在使用 Object.defineProperty() 定义属性时的默认值）：
    configurable
    当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
    默认为 false。
    
    enumerable
    当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。
    默认为 false。
    数据描述符还具有以下可选键值：

    value
    该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。
    默认为 undefined。
    
    writable
    当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符改变。
    默认为 false。

  存取描述符还具有以下可选键值：
    get
    属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数。执行时不传入任何参数，
    但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。
    默认为 undefined。
    set
    属性的 setter 函数，如果没有 setter，则为 undefined
    。当属性值被修改时，会调用此函数。
    该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。
    默认为 undefined。 

    具体去官网自己试验：
    https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
*/

//如果一个对象本身部署了__proto__属性，则该属性的值就是对象的原型。

console.log(Object.getPrototypeOf({ __proto__: null })) //null
