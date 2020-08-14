// /ES6为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被for...of循环遍历。
if (0) {
  for (let codePoint of "foo") {
    console.log(codePoint)
  }
}
/**
 * 除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，
 * 传统的for循环无法识别这样的码点。
 */
if (0) {
  const text = String.fromCodePoint(0x20bb7)
  for (let i = 0; i < text.length; i++) {
    console.log(text[i]) //� �
  }
  for (let i of text) {
    console.log(i) //𠮷
  }
  //上面代码中，字符串text只有一个字符，但是for循环会认为它包含两个字符（都不可打印），
  //而for...of循环会正确识别出这一个字符。
}
//ES5对字符串对象提供charAt方法，返回字符串给定位置的字符。
//该方法不能识别码点大于0xFFFF的字符。
if (1) {
  console.log("abc".charAt(0)) //a
  console.log("𠮷".charAt(0)) // �
  //目前，有一个提案，提出字符串实例的at方法，可以识别Unicode编号大于0xFFFF的字符，返回正确的字符。
  console.log("abc".at(0)) //a
  console.log("𠮷".at(0)) // �
  //提案已经被毙了，上面报错
}
