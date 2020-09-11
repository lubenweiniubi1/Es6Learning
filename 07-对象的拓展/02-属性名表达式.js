//JavaScript语言定义对象的属性，有两种方法。
// 方法一
var obj = {}
obj.foo = true
// 方法二
obj["ab" + "bc"] = 123

//上面代码的方法一是直接用标识符作为属性名，方法二是用表达式作为属性名，这时要将表达式放在方括号之内。

//但是，如果使用字面量方式定义对象（使用大括号），
//在 ES5 中只能使用方法一（标识符）定义属性。
var obj = {
  foo: true,
  abc: 123,
}

//ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。
let propKey = "foo1"
var obj1 = {
  [propKey]: true,
  ["a" + "bc"]: 123,
}
console.log(obj1)

//下面是另一个例子。
var lastWord = "last word"
var a = {
  "first word": "hello",
  [lastWord]: "world",
}

console.log(a["first word"])
console.log(a[lastWord])
console.log(a["last word"])

//表达式还可以用于定义方法名。
let obc = {
  ["h" + "ello"]() {
    return "hi"
  },
}
console.log(obc.hello()) //hi
console.log(obc["hello"]()) //hi

//注意，属性名表达式与简洁表示法，不能同时使用，会报错。

// 报错
var foo = "bar"
var bar = "abc"
// var baz = { [foo] };

// 正确
var foo = "bar"
var baz = { [foo]: "abc" }

//注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。
const keyA = { a: 1 }
const keyB = { b: 2 }

const myOb = {
  [keyA]: "valueA",
  [keyB]: "valueB",
}
console.log(myOb)//{ '[object Object]': 'valueB' }

//上面代码中，[keyA]和[keyB]得到的都是[object Object]，所以[keyB]会把[keyA]覆盖掉，而myObject最后只有一个[object Object]属性。
