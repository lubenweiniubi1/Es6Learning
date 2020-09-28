//（1）Map转为数组
//前面已经提过，Map转为数组最方便的方法，就是使用扩展运算符（...）。
var myMap = new Map().set(true, 8).set({ foo: 3 }, ["abc"])
console.log([...myMap]) // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

//（2）数组转为Map
//将数组转入Map构造函数，就可以转为Map。
new Map([
  [true, 7],
  [{ foo: 3 }, ["abc"]],
]) // Map {true => 7, Object {foo: 3} => ['abc']}

//（3）Map转为对象
//如果所有Map的键都是字符串，它可以转为对象。
function strMapToObj(strMap) {
  let obj = Object.create(null)
  for (let [k, v] of strMap) {
    obj[k] = v
  }
  return obj
}

var myMap = new Map().set("yes", true).set("no", false)
console.log(strMapToObj(myMap)) //[Object: null prototype] { yes: true, no: false }

//（4）对象转为Map
function objToStrMap(obj) {
  var strMap = new Map()
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k])
  }
  return strMap
}
console.log(objToStrMap({ yes: true, no: false })) //Map { 'yes' => true, 'no' => false }

//（5）Map转为JSON
//Map转为JSON要区分两种情况。一种情况是，Map的键名都是字符串，这时可以选择转为对象JSON。
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap))
}
