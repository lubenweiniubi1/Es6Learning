//解构不仅可以用于数组，还可以用于对象。
if (0) {
  let { foo, bar } = { foo: "Im", bar: "bigSB" }
  console.log(foo, bar) //Im bigSb
}

/**
 * 对象的解构与数组有一个重要的不同。
 * 数组的元素是按次序排列的，变量的取值由它的位置决定；
 * 而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
 */
if (1) {
  let { bar, foo } = { foo: "aaa", bar: "bbb" }
  console.log(foo, bar) //这里次序不影响

  let { baz } = { foo: "aaa", bar: "bbb" }
  console.log(baz) //undefined，这里必须要和对应的属性重名

  //如果变量名与属性名不一致，必须写成下面这样。
  let { foo: variable1 } = { foo: "aa1a", bar: "bbb" }
  console.log(variable1) //aa1a

  let obj = { first: "hello", last: "world" }
  let { first: f, last: l } = obj
  console.log(f, l) //hello world

  //这实际上说明，对象的解构赋值是下面形式的简写（参见《对象的扩展》一章）
  if (0) {
    let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" }
  }

  /**
   * 也就是说，对象的解构赋值的内部机制，是先找到同名属性，
   * 然后再赋给对应的变量。
   * 真正被赋值的是后者，而不是前者。
   */

  let { foo7: barzs } = { foo7: "aaa7", bar: "bbb" }
  console.log(barzs) //aaa
  0 && console.log(foo7) //foo7 is not defined
  //上面代码中，foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo7。

  if (1) {
    //注意，采用这种写法时，变量的声明和赋值是一体的。对于let和const来说，变量不能重新声明，所以一旦赋值的变量以前声明过，就会报错。
    let foo
    let { foo } = { foo: 1 }
  }
}
