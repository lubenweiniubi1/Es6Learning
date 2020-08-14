//const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。
if (0) {
  // const a //SyntaxError: Missing initializer in const declaration，这里得注掉，不然报错了
}

//const的作用域与let命令相同：只在声明所在的块级作用域内有效。
if (0) {
  if (true) {
    const Max = 5
  }
  Max //报错
}
//const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

//const声明的常量，也与let一样不可重复声明。
if(1){
    var message = 'nihao'
    let age =25

    //下面两行都报错
    const message = "goodbye!"
    const age = 30;
}