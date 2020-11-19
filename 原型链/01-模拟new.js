function Animal() {
  this.name = 'Animal name'
}

Animal.prototype.getName = function () {
  return this.name
}

// const aaa = new Animal() //这里是一个实例
// console.log(aaa.getName()) //Animal name

//关于this指向问题.查看https://github.com/tsingroo/dive_into_fe_in_a_simple_way

function myNew(fn) {
  const obj = {}
  obj.__proto__ = fn.prototype //原型指向
  fn.apply(obj, []) //obj执行这个函数就会挂上name,不执行这一句就是undefined
  return obj
}
const newAnimal = myNew(Animal)

console.log(newAnimal.getName()) //Animal name

/**
apply() 方法调用一个具有给定this值的函数，以及以一个数组（或类数组对象）的形式提供的参数。
如：

const numbers = [5, 6, 2, 3, 7];
const max = Math.max.apply(null, numbers);

语法：
func.apply(thisArg, [argsArray])

thisArg
必选的。在 func 函数运行时使用的 this 值。请注意，this可能不是该方法看到的实际值：如果这个函数处于非严格模式下，
则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。

argsArray
可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 func 函数。如果该参数的值为 null 或  undefined
，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。 浏览器兼容性 请参阅本文底部内容。 

返回值
调用有指定this值和参数的函数的结果。
*/
