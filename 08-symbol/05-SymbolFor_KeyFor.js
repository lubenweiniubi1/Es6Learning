//有时，我们希望重新使用同一个Symbol值，Symbol.for方法可以做到这一点。
//它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。
//如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。
var s1 = Symbol("foo")
var s2 = Symbol("foo")

console.log(s1 === s2) //false

s1 = Symbol.for("foo2")
s2 = Symbol.for("foo2")
console.log(s1 === s2)

//上面代码中，s1和s2都是 Symbol 值，但是它们都是同样参数的Symbol.for方法生成的，所以实际上是同一个值。

/**
 * Symbol.for()与Symbol()这两种写法，都会生成新的Symbol。
 * 它们的区别是，前者会被登记在全局环境中供搜索，后者不会。
 * Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。
 * 比如，如果你调用Symbol.for("cat")30次，每次都会返回同一个 Symbol 值，但是调用Symbol("cat")30次，会返回30个不同的Symbol值。
 */
console.log(Symbol.for("bar") === Symbol.for("bar")) //true
console.log(Symbol("bar") === Symbol("bar")) //false
//上面代码中，由于Symbol()写法没有登记机制，所以每次调用都会返回一个不同的值。

//Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。
var s1 = Symbol.for("foo")
console.log(Symbol.keyFor(s1)) // "foo"

var s2 = Symbol("foo") // 'foo'
console.log(Symbol.keyFor(s2)); // undefined
//上面代码中，变量s2属于未登记的Symbol值，所以返回undefined

//需要注意的是，Symbol.for为Symbol值登记的名字，是全局环境的，可以在不同的 iframe 或 service worker 中取到同一个值。
 