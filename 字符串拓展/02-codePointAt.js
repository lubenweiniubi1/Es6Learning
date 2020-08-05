//JavaScript内部，字符以UTF-16的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode码点大于0xFFFF的字符），JavaScript会认为它们是两个字符。
if (0) {
  /**
   * harCodeAt() 方法返回 0 到 65535 之间的整数，
   * 表示给定索引处的 UTF-16 代码单元
   */
  const s = "𠮷"
  console.log(s.length) //2
  console.log(s.charAt(0)) //打印不了 �
  console.log(s.charAt(1)) //打印不了 �
  console.log(s.charCodeAt(1)) // 57271
  console.log(s.charCodeAt(0)) // 55362
}
/**
 * 上面代码中，汉字“”（注意，这个字不是”吉祥“的”吉“）的码点是0x20BB7，
 * UTF-16编码为0xD842 0xDFB7（十进制为55362 57271），需要4个字节储存。
 * 对于这种4个字节的字符，JavaScript不能正确处理，字符串长度会误判为2，
 * 而且charAt方法无法读取整个字符，charCodeAt方法只能分别返回前两个字节和后两个字节的值。
 *
 * ES6提供了codePointAt方法，能够正确处理4个字节储存的字符，返回一个字符的码点。
 */
if (1) {
  const s = "𠮷a"
  console.log(s.codePointAt(0)) //134071
  console.log(s.codePointAt(1)) // 57271
  console.log(s.codePointAt(2)) // 97
}

/**
 * codePointAt方法的参数，是字符在字符串中的位置（从0开始）。
 * 上面代码中，JavaScript将“𠮷a”视为三个字符，codePointAt方法在第一个字符上，正确地识别了“”，返回了它的十进制码点134071（即十六进制的20BB7）。在第二个字符（即“”的后两个字节）和第三个字符“a”上，codePointAt方法的结果与charCodeAt方法相同。
 */
