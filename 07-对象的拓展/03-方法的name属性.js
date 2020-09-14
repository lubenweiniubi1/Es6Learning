//函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。

const person = {
  sayName() {
    console.log("helo")
  },
}
console.log(person.sayName.name) //sayName
//上面代码中，方法的name属性返回函数名（即方法名）。

//如果对象的方法使用了取值函数（getter）和存值函数（setter），
//则name属性不是在该方法上面，
//而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set。
const obj = {
  get foo() {},
  set foo(x) {},
}

// console.log(obj.foo.name) //TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj, "foo")

console.log(descriptor.get.name) //get foo
console.log(descriptor.set.name) //set foo

//有两种特殊情况：
//bind方法创造的函数，name属性返回bound加上原函数的名字；
//Function构造函数创造的函数，name属性返回anonymous。
console.log(new Function().name) //anonymous

var doSomething = function () {}

console.log(doSomething.name) //doSomething
console.log(doSomething.bind().name) //bound doSomething

//如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。
const key1 = Symbol('蔡徐坤')
const key2 = Symbol()
let obs = {
    [key1](){},
    [key2](){}
}
console.log(obs[key1].name); //[蔡徐坤]
console.log(obs[key2].name);// 空字符串
//上面代码中，key1对应的 Symbol 值有描述，key2没有。
