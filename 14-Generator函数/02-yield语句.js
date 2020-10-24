/**
由于Generator函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield语句就是暂停标志。

遍历器对象的next方法的运行逻辑如下。

（1）遇到yield语句，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。

（2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield语句。

（3）如果没有再遇到新的yield语句，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。

（4）如果该函数没有return语句，则返回的对象的value属性值为undefined。

需要注意的是，yield语句后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，
因此等于为JavaScript提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。
 */
if (0) {
  function* gen() {
    yield 123 + 345
  }
}
//上面代码中，yield后面的表达式123 + 456，不会立即求值，只会在next方法将指针移到这一句时，才会求值。

/**
yield语句与return语句既有相似之处，也有区别。

相似之处在于，都能返回紧跟在语句后面的那个表达式的值。

区别在于每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能。
一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield语句。
正常函数只能返回一个值，因为只能执行一次return；
Generator函数可以返回一系列的值，因为可以有任意多个yield。
从另一个角度看，也可以说Generator生成了一系列的值，这也就是它的名称的来历（在英语中，generator这个词是“生成器”的意思）。
 */

//Generator函数可以不用yield语句，这时就变成了一个单纯的暂缓执行函数。
if (0) {
  function* f() {
    console.log("执行了 傻逼！")
  }

  var generator = f()

  setTimeout(() => {
    generator.next()
  }, 1000)
}
//1s 后 执行了 傻逼！ 上面代码中，函数f如果是普通函数，在为变量generator赋值时就会执行。但是，函数f是一个 Generator 函数，就变成只有调用next方法时，函数f才会执行。
//另外需要注意，yield语句只能用在 Generator 函数里面，用在其他地方都会报错。
//   function A() {
//     yield a //报错
//   } 上面代码在一个普通函数中使用yield语句，结果产生一个句法错误。

// if(1){
//     var arr = [1, [[2, 3], 4], [5, 6]];

// var flat = function* (a) {
//   a.forEach(function (item) {
//     if (typeof item !== 'number') {
//       yield* flat(item);
//     } else {
//       yield item;
//     }
//   }
// };

// for (var f of flat(arr)){
//   console.log(f);
// }
// }
//上面代码也会产生句法错误，因为forEach方法的参数是一个普通函数，但是在里面使用了yield语句（这个函数里面还使用了yield*语句，详细介绍见后文）。一种修改方法是改用for循环。
if (0) {
  var arr = [1, [[2, 3], 4], [5, 6]]
  var flat = function* (a) {
    var length = a.length
    for (var i = 0; i < length; i++) {
      var item = a[i]
      if (typeof item !== "number") {
        yield* flat(item)
      } else {
        yield item
      }
    }
  }

  for (let i of flat(arr)) {
    console.log(i)
  }
}

//另外，yield语句如果用在一个表达式之中，必须放在圆括号里面。
if (0) {
  function* demo() {
    // console.log("a" + yield) err
    // console.log('a'+yield 123); err

    console.log("a" + (yield)) //ok
    console.log("a" + (yield 123)) //ok
  }
}

//yield语句用作函数参数或放在赋值表达式的右边，可以不加括号。
if (0) {
  function foo(a, b) {
    console.log(a, b)
  }
  function* demo() {
    yield 1
    foo(yield "a", yield "b") // OK
    let input = yield // OK
  }
}

/**
 * 与 Iterator 接口的关系 
上一章说过，任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。

由于Generator函数就是遍历器生成函数，因此可以把Generator赋值给对象的Symbol.iterator属性，从而使得该对象具有Iterator接口。
 */
if (0) {
  const myIterable = {}
  myIterable[Symbol.iterator] = function* () {
    yield 1
    yield 2
    yield 3
  }
  console.log(...myIterable) //1 2 3
}
//Generator函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身。
if (1) {
  function* gen() {}
  var g = gen()

  console.log(g[Symbol.iterator]() === g) // true
}
//上面代码中，gen是一个Generator函数，调用它会生成一个遍历器对象g。
//它的Symbol.iterator属性，也是一个遍历器对象生成函数，执行后返回它自己。
