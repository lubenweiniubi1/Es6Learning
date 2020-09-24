/**
 * Set结构的实例有四个遍历方法，可以用于遍历成员。

   keys()：返回键名的遍历器
   values()：返回键值的遍历器
   entries()：返回键值对的遍历器
   forEach()：使用回调函数遍历每个成员  
   需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用Set保存一个回调函数列表，调用时就能保证按照添加顺序调用。
 */

//（1）keys()，values()，entries()
//keys方法、values方法、entries方法返回的都是遍历器对象（详见《Iterator 对象》一章）。
//由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
var set = new Set(["red", "green", "blue"])
for (let i of set) {
  console.log(i)
  // red
  // green
  // blue
}

for (let i of set.values()) {
  console.log(i)
  //同上
}
for (let i of set.entries()) {
  console.log(i) //[("red", "red")]  [("green", "green")]  [("blue", "blue")]
}
//上面代码中，entries方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，它的两个成员完全相等。

//Set结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
console.log(Set.prototype[Symbol.iterator] === Set.prototype.values) //true
//这意味着，可以省略values方法，直接用for...of循环遍历Set。
var tes = new Set()
// tes[Symbol.iterator] = () => {
//   console.log("尼玛死了 撒比")
//   return {}
// }
tes.add(1)
tes.add(2)
for (let i of tes) {
  console.log(i)
}

//forEach()
// Set结构的实例的forEach方法，用于对每个成员执行某种操作，没有返回值。

var set = new Set([1, 2, 3])
set.forEach((value, key, co) => console.log(value * 2, key, co), this)
// 2
// 4
// 6
// 上面代码说明，forEach方法的参数就是一个处理函数。该函数的参数依次为键值、键名、集合本身（上例省略了该参数）。
//另外，forEach方法还可以有第二个参数，表示绑定的this对象。
