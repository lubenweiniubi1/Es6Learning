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
