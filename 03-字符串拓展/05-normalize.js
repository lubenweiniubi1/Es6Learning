/**
 * 许多欧洲语言有语调符号和重音符号。为了表示它们，Unicode提供了两种方法。
 * 一种是直接提供带重音符号的字符，比如Ǒ（\u01D1）。
 * 另一种是提供合成符号（combining character），即原字符与重音符号的合成，
 * 两个字符合成一个字符，比如O（\u004F）和ˇ（\u030C）合成Ǒ（\u004F\u030C）。
 * 这两种表示方法，在视觉和语义上都等价，但是JavaScript不能识别。
 */
if (1) {
  console.log("\u01D1" === "\u004F\u030C") //false
  console.log("\u01D1".length) // 1
  console.log("\u004F\u030C".length) // 2
  //上面代码表示，JavaScript将合成字符视为两个字符，导致两种表示方法不相等。
}
/**
 * ES6提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的
 * 形式，这称为Unicode正规化。
 */
if (1) {
  console.log("\u01D1".normalize("NFKC"))
  console.log("\u004F\u030C".normalize("NFKD"))
  console.log("\u01D1".normalize() === "\u004F\u030C".normalize()) //true
  console.log("\u01D1".normalize("NFKC") === "\u004F\u030C".normalize("NFKD")) //false
  console.log("\u004F\u030C".normalize("NFD").length) //2 看起来没啥区别，但是是两个
  /**
   * 上面代码表示，NFC参数返回字符的合成形式，NFD参数返回字符的分解形式。
   * 不过，normalize方法目前不能识别三个或三个以上字符的合成。这种情况下，
   * 还是只能使用正则表达式，通过Unicode编号区间判断。
   */
}
