//ES6提供三个新的方法——entries()，keys()和values()——用于遍历数组。
//它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历
//唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
var arr = ["a", "b"]

for (let index of arr.keys()) {
  console.log(index) //0 1
}

for (let index of arr.values()) {
  console.log(index) //a b
}
for (let [index, elem] of arr.entries()) {
  console.log(index, elem) //0 a
  //1 b
}

//如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
let letter = ['a','b','c']
let entries = letter.entries()
console.log(entries.next().value);
console.log(entries.next().value);
console.log(entries.next().value);
//[ 0, 'a' ]
//[ 1, 'b' ]
//[ 2, 'c' ]