//数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位。
0 && console.log(Array(3)) //[ <3 empty items> ]
0 && console.log([, ,]) //[<2 empty items]
0 && console.log([,]) //[ <1 empty item> ]
0 && console.log([]) //[]
0 && console.log([,].length) //1
0 && console.log([].length) //0
//上面代码中，Array(3)返回一个具有3个空位的数组。

//注意，空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点。
0 && console.log(0 in [undefined, undefined]) //true
0 && console.log(1 in [, , ,]) //false
//上面代码说明，第一个数组的0号位置是有值的，第二个数组的0号位置没有值。
/**in   :
 * 如果指定的属性在指定的对象或其原型链中，则in 运算符返回true。
 * */

/**
 * ES5对空位的处理，已经很不一致了，大多数情况下会忽略空位。
    forEach(), filter(), every() 和some()都会跳过空位。
    map()会跳过空位，但会保留这个值
    join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
 */
0 && console.log([, "a"].forEach((x, i) => console.log(i)))
0 && console.log(["a", , "b"].filter((x) => true)) //[ 'a', 'b' ]
0 && console.log([, "a"].some((x) => x !== "a")) //false
0 && console.log([, "a", undefined, null].join("#")) //#a##
0 && console.log([, "a"].map((x) => 1)) //[<1 empty item>,1]
0 && console.log([, "a", undefined, null].toString()) //,a,,

//ES6则是明确将空位转为undefined。
//Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。
0 && console.log(Array.from(["a", , "b"])) //[ 'a', undefined, 'b' ]

//扩展运算符（...）也会将空位转为undefined
0 && console.log([...["a", , "b"]]) //同上

//copyWithin()会连空位一起拷贝
0 && console.log([, "a", "b", ,].copyWithin(2, 0))

//fill()会将空位视为正常的数组位置。
0 && console.log(new Array(3).fill("a")) //[ 'a', 'a', 'a' ]

//for...of循环也会遍历空位
let arr = [, ,]
for (let i of arr) {
  console.log(i) //undefined
}

//entries()、keys()、values()、find()和findIndex()会将空位处理成undefined
1 && console.log([...[, "a"].entries()]) //[ [ 0, undefined ], [ 1, 'a' ] ]
1 && console.log([...[, "a"].keys()]) // [0,1])
1 && console.log([...[, "a"].values()]) //[ undefined, 'a' ]
1 && console.log([, "a"].find((x) => true)) // undefined
1 && console.log([, "a"].findIndex((x) => true)) // undefined
//由于空位的处理规则非常不统一，所以建议避免出现空位。