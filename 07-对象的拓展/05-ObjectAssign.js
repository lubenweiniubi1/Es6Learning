//Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

var target = { a: 1 }
var source1 = { b: 2 }
var source2 = { c: 3 }

console.log(Object.assign(target, source1, source2)) //{ a: 1, b: 2, c: 3 }

//Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。

//注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
var target = { a: 1, b: 1 }
var source1 = { b: 2, c: 2 }
var source2 = { c: 3 }
console.log(Object.assign(target, source1, source2)) //{ a: 1, b: 2, c: 3 }

//如果只有一个参数，Object.assign会直接返回该参数。
console.log(Object.assign(target, source1, source2) === target) //都是true
console.log(Object.assign({}, target, source1, source2) === target) //false

//如果该参数不是对象，则会先转成对象，然后返回。
console.log(typeof Object.assign(2)) //object

//由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。
// console.log(Object.assign(undefined)) //TypeError: Cannot convert undefined or null to object

//如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。
//首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果undefined和null不在首参数，就不会报错。

let obj = { a: 1 }

console.log(Object.assign(obj, null, undefined, { b: 2 })) //true
console.log(obj) //会改变元对象

//其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。
console.log(Object.assign(obj, null, undefined, 1, 2, 3, 4, 5, "你吗死了")) //{ '0': '你', '1': '吗', '2': '死', '3': '了', a: 1, b: 2 }

//上面代码中，分别是字符串、布尔值和数值，结果只有字符串合入目标对象（以字符数组的形式），数值和布尔值都会被忽略。这是因为只有字符串的包装对象，会产生可枚举属性。

//Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。
console.log(
  Object.assign(
    { b: "c" },
    Object.defineProperty({}, "invisible", {
      enumerable: false,
      value: "hello",
    })
  )
) //{ b: 'c' }
//上面代码中，Object.assign要拷贝的对象只有一个不可枚举属性invisible，这个属性并没有被拷贝进去。

//属性名为Symbol值的属性，也会被Object.assign拷贝。
console.log(Object.assign({ a: "b" }, { [Symbol("c")]: "d" })) //{ a: 'b', [Symbol(c)]: 'd' }

//Object.assign方法实行的是浅拷贝，而不是深拷贝。
//也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

var obj1 = { a: { b: 1 } }
var obj2 = Object.assign({}, obj1)

console.log(obj1.a.b) //1
obj2.a.b = 2
console.log(obj1.a.b) //2

//上面代码中，源对象obj1的a属性的值是一个对象，Object.assign拷贝得到的是这个对象的引用。这个对象的任何变化，都会反映到目标对象上面。

//对于这种嵌套的对象，一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加。
var target = { a: { b: "c", d: "e" } }
var source = { a: { b: "hello" } }
Object.assign(target, source)
console.log(target) //{ a: { b: 'hello' } }
//上面代码中，target对象的a属性被source对象的a属性整个替换掉了，而不会得到{ a: { b: 'hello', d: 'e' } }的结果。这通常不是开发者想要的，需要特别小心。

//有一些函数库提供Object.assign的定制版本（比如Lodash的_.defaultsDeep方法），可以解决浅拷贝的问题，得到深拷贝的合并。

//注意，Object.assign可以用来处理数组，但是会把数组视为对象。
console.log(Object.assign([1, 2, 3], [4, 5])) //[ 4, 5, 3 ]
//上面代码中，Object.assign把数组视为属性名为0、1、2的对象，因此源数组的0号属性4覆盖了目标数组的0号属性1。