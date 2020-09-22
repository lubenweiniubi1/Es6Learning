//由于每一个Symbol值都是不相等的，这意味着Symbol值可以作为标识符，用于对象的属性名，
//就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
var mySymbol = Symbol()

var a = {}
a[mySymbol] = "hello"
console.log(a) //{ [Symbol()]: 'hello' }
//第二种写法
var a = {
  [mySymbol]: "hello",
}
console.log(a) //{ [Symbol()]: 'hello' }
// 第三种写法

// 第三种写法
var z = {}
Object.defineProperty(z, mySymbol, { value: "Hello!" })
console.log(z[mySymbol]) // Hello!

//上面代码通过方括号结构和Object.defineProperty，将对象的属性名指定为一个Symbol值。
//注意，Symbol值作为对象属性名时，不能用点运算符。
var mySymbol = Symbol()
var a = {}

a.mySymbol = "Hello!"
console.log(a[mySymbol]) //undefined
console.log(a["mySymbol"]) //Hello!

//上面代码中，因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值，
//导致a的属性名实际上是一个字符串，而不是一个Symbol值。
//同理，在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中。
var s = Symbol()

var obj = {
  [s]: function (arg) {},
}

obj[s](123)
//上面代码中，如果s不放在方括号中，该属性的键名就是字符串s，而不是s所代表的那个Symbol值。
//采用增强的对象写法，上面代码的obj对象可以写得更简洁一些。

//Symbol类型还可以用于定义一组常量，保证这组常量的值都是不相等的。
var log = {}
log.levels = {
  DEBUG: Symbol("debug"),
  INFO: Symbol("info"),
  WARN: Symbol("warning"),
}
console.log(log.levels.DEBUG, "debug message")
console.log(log.levels.INFO, "INFO message")

//常量使用Symbol值最大的好处，就是其他任何值都不可能有相同的值了，因此可以保证上面的switch语句会按设计的方式工作。

//还有一点需要注意，Symbol值作为属性名时，该属性还是公开属性，不是私有属性。