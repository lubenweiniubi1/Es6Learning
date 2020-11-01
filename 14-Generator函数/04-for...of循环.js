//for...of循环可以自动遍历Generator函数时生成的Iterator对象，且此时不再需要调用next方法。
if (0) {
  function* foo() {
    yield 1
    yield 2
    yield 3
    yield 4
    yield 5
    return 6
  }

  for (let v of foo()) {
    console.log(v)
  }
}
//上面代码使用for...of循环，依次显示5个yield语句的值。这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的6，不包括在for...of循环之中。

//下面是一个利用Generator函数和for...of循环，实现斐波那契数列的例子。
if (1) {
  function* fibonacci() {
    let [pre, cur] = [0, 1]
    for (;;) {
        yield pre
        ;[pre, cur] = [cur, pre + cur]
    }
  }

  for (let n of fibonacci()) {
    if (n > 10) break
    console.log(n)
  }
}
//从上面代码可见，使用for...of语句时不需要使用next方法。
