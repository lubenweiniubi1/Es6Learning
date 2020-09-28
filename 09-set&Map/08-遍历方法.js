/**
 *  Map原生提供三个遍历器生成函数和一个遍历方法。
    keys()：返回键名的遍历器。
    values()：返回键值的遍历器。
    entries()：返回所有成员的遍历器。
    forEach()：遍历Map的所有成员。

    需要特别注意的是，Map的遍历顺序就是插入顺序。
 */
//下面是使用实例。
var map = new Map([
  ["F", "no"],
  ["T", "yes"],
])

for (let key of map.keys()) {
  console.log(key)
}

for (let value of map.values()) {
  console.log(value)
}
for (let item of map.entries()) {
  console.log(item)
}
for (let [key, value] of map.entries()) {
  console.log(key, value)
}
//等同于使用 map.entries
for (let [key, value] of map) {
  console.log(key, value)
}
//上面代码最后的那个例子，表示Map结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
map[Symbol.iterator] = function* () {
  console.log("尼玛死了")
  yield [1, 2]
}
for (let [key, value] of map) {
  console.log(key, value) //尼玛死了  1,2
}
console.log(map[Symbol.iterator] === map.entries) //false

//Map结构转为数组结构，比较快速的方法是结合使用扩展运算符（...）。
var map = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
])

console.log([...map.keys()]) //[ 1, 2, 3 ]
console.log([...map.values()]) // ['one', 'two', 'three']
console.log([...map.entries()]) //[ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ] ]
console.log([...map]) //[ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ] ]

//结合数组的map方法、filter方法，可以实现Map的遍历和过滤（Map本身没有map和filter方法）。
var map0 = new Map().set(1, "a").set(2, "b").set(3, "c")

var map1 = new Map([...map0].filter(([key, value]) => key < 3))
console.log("123,", map1) //Map { 1 => 'a', 2 => 'b' }
var map2 = new Map([...map0].map(([k, v]) => [k * 2, "_" + v]))
console.log(map2) //Map { 2 => '_a', 4 => '_b', 6 => '_c' }

//forEach方法还可以接受第二个参数，用来绑定this。
var reporter = {
  report: function (k, v) {
    console.log("Key: %s,Value:%s ", k, v)
  },
}
map2.forEach(function (v, k) {
  this.report(k, v)
}, reporter)
//上面代码中，forEach方法的回调函数的this，就指向reporter。