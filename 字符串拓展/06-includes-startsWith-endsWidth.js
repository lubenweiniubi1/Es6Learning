/**
 * 传统上，JavaScript只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。
 * ES6又提供了三种新方法。
    includes()：返回布尔值，表示是否找到了参数字符串。
    startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
    endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。
 */
if (0) {
  const s = "Hello world!"
  console.log(s.startsWith("Hello")) //true
  console.log(s.endsWith("!")) //true
  console.log(s.includes("o")) //true
}
//这三个方法都支持第二个参数，表示开始搜索的位置。 
if (1) {
  const s = "Hello world!"
  console.log(s.startsWith("world",6)) //true
  console.log(s.endsWith("!",12)) //true
  console.log(s.includes("Hello")) //true
  //上面代码表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。
}
if (1) {
}
if (1) {
}
