//let不允许在相同作用域内，重复声明同一个变量。

function exampleA (){
    let a = 10
    // var a = 12//报错 SyntaxError: Identifier 'a' has already been declared
}
 

//因此，不能在函数内部重新声明参数
function exampleB (par1){
  let par1 = 10 //SyntaxError: Identifier 'par1' has already been declared
}
 