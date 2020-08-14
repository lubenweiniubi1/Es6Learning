/**
 * 在ES5中，RegExp构造函数的参数有两种情况。
 *
 * 第一种情况是，参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）。
 */
if (0) {
  var regex = new RegExp("xyz", "i")
  //等价于
  var regex = /xyz/i

  console.log("xyz123".match(regex))
}

/**
 * 第二种情况是，参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝。但是，ES5不允许此时使用第二个参数，添加修饰符，否则会报错。
 * ES6改变了这种行为。如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。
 */
if (1) {
  var regex = new RegExp(/xyz/i)
  // 等价于
  var regex = /xyz/i
  console.log(regex.test("xy1z1"))
  var regex = new RegExp(/xyz/g, "i")
  // Uncaught TypeError: Cannot su
  console.log(regex.flags) //  i
}
/**
 * 字符串对象共有4个方法，可以使用正则表达式：match()、replace()、search()和split()。
 * ES6将这4个方法，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上。
 * String.prototype.match 调用 RegExp.prototype[Symbol.match]
 * String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
 * String.prototype.search 调用 RegExp.prototype[Symbol.search]

 */
if (1) {
}
if (1) {
}
if (1) {
}
if (1) {
}
if (1) {
}
if (1) {
}
if (1) {
}
if (1) {
}
if (1) {
}
