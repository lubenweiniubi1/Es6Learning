//ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
//Set 本身是一个构造函数，用来生成 Set 数据结构。

var s = new Set()
;[2, 3, 5, 4, 5, 2, 2].forEach((x) => s.add(x))
for (let i of s) {
  console.log(i) // 2 3 5 4
}
//上面代码通过add方法向 Set 结构加入成员，结果表明 Set 结构不会添加重复的值。

//Set 函数可以接受一个数组（或类似数组的对象）作为参数，用来初始化。

//例一
var set = new Set([1, 2, 3, 4, 5])
console.log(set) //Set { 1, 2, 3, 4, 5 }
console.log([...set]) //[ 1, 2, 3, 4, 5 ]

//例二
var items = new Set([1, 2, 3, 4, 5, 5, 5, 5, 5, 5])
console.log(items.size) //5

//上面代码中，例一和例二都是Set函数接受数组作为参数，例三是接受类似数组的对象作为参数。
//上面代码中，也展示了一种去除数组重复成员的方法。
//// 去除数组的重复成员
;[...new Set([1, 2, 3, 4, 5, 6, 7, 7, 7, 7])]

//向Set加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。
//Set内部判断两个值是否不同，使用的算法叫做“Same-value equality”，它类似于精确相等运算符（===），
//主要的区别是NaN等于自身，而精确相等运算符认为NaN不等于自身。
var set = new Set()
var a = NaN
var b = NaN
set.add(a)
set.add(b)
console.log(set) //Set { NaN }

//上面代码向Set实例添加了两个NaN，但是只能加入一个。这表明，在Set内部，两个NaN是相等。

//另外，两个对象总是不相等的。
let set = new Set()

set.add({})
set.size // 1

set.add({})
set.size // 2
