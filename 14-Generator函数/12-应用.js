//Generator可以暂停函数执行，返回任意表达式的值。这种特点使得Generator有多种应用场景。
/**
 * （1）异步操作的同步化表达
Generator函数的暂停执行的效果，意味着可以把异步操作写在yield语句里面，等到调用next方法时再往后执行。
这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在yield语句下面，反正要等到调用next方法时再执行。
所以，Generator函数的一个重要实际意义就是用来处理异步操作，改写回调函数。
 */
if (0) {
  function* loadUI() {
    showLoadingScreen()
    yield loadUIDataAsynchronously()
    hideLoadingScreen()
  }

  const loader = loadUI()

  // 加载UI
  loader.next()

  // 卸载UI
  loader.next()
}
//上面代码表示，第一次调用loadUI函数时，该函数不会执行，仅返回一个遍历器。
//下一次对该遍历器调用next方法，则会显示Loading界面，并且异步加载数据。
//等到数据加载完成，再一次使用next方法，则会隐藏Loading界面。
//可以看到，这种写法的好处是所有Loading界面的逻辑，都被封装在一个函数，按部就班非常清晰。

//Ajax是典型的异步操作，通过Generator函数部署Ajax操作，可以用同步的方式表达。
if (0) {
  function* main() {
    var result = yield request('http://some.url')
    var resp = JSON.parse(result)
    console.log(resp.value)
  }

  function request(url) {
    makeAjaxCall(url, function (response) {
      it.next(response)
    })
  }

  var it = main()
  it.next()
}
/**
 * 上面代码的main函数，就是通过Ajax操作获取数据。
 * 可以看到，除了多了一个yield，它几乎与同步操作的写法完全一样。
 * 注意，makeAjaxCall函数中的next方法，必须加上response参数，因为yield语句构成的表达式，本身是没有值的，总是等于undefined。
 */

//下面是另一个例子，通过Generator函数逐行读取文本文件。
if (1) {
  function* numbers() {
    let file = new FileReader('numbers.txt')
    try {
      while (!file.eof) {
        yield parseInt(file.readLine(), 10)
      }
    } finally {
      file.close()
    }
  }
}
//   上面代码打开文本文件，使用yield语句可以手动逐行读取文件。

//（2）控制流管理
// 如果有一个多步操作非常耗时，采用回调函数，可能会写成下面这样。
if (0) {
  step1(function (value1) {
    step2(value1, function (value2) {
      step3(value2, function (value3) {
        step4(value3, function (value4) {
          // Do something with value4
        })
      })
    })
  })
}
//采用Promise改写上面的代码。
if (0) {
  Promise.resolve(step1)
    .then(step2)
    .then(step3)
    .then(step4)
    .then(
      function (value4) {
        // Do something with value4
      },
      function (error) {
        // Handle any error from step1 through step4
      }
    )
    .done()
}
//上面代码已经把回调函数，改成了直线执行的形式，但是加入了大量Promise的语法。
//Generator函数可以进一步改善代码运行流程。

if (0) {
  function* longRunningTask(value1) {
    try {
      var value2 = yield step1(value1)
      var value3 = yield step2(value2)
      var value4 = yield step3(value3)
      var value5 = yield step4(value4)
      // Do something with value4
    } catch (e) {
      // Handle any error from step1 through step4
    }
  }

  //然后，使用一个函数，按次序自动执行所有步骤。

  scheduler(longRunningTask(initialValue))

  function scheduler(task) {
    var taskObj = task.next(task.value)
    // 如果Generator函数未结束，就继续调用
    if (!taskObj.done) {
      task.value = taskObj.value
      scheduler(task)
    }
  }
}
//注意，上面这种做法，只适合同步操作，即所有的task都必须是同步的，不能有异步操作。因为这里的代码一得到返回值，就继续往下执行，没有判断异步操作何时完成。如果要控制异步的操作流程，详见后面的《异步操作》一章。

//下面，利用for...of循环会自动依次执行yield命令的特性，提供一种更一般的控制流管理的方法。
if (0) {
  let steps = [step1Func, step2Func, step3Func]

  function* iterateSteps(steps) {
    for (var i = 0; i < steps.length; i++) {
      var step = steps[i]
      yield step()
    }
  }
}
//上面代码中，数组steps封装了一个任务的多个步骤，Generator函数iterateSteps则是依次为这些步骤加上yield命令。

// 将任务分解成步骤之后，还可以将项目分解成多个依次执行的任务。
if (0) {
  let jobs = [job1, job2, job3]

  function* iterateJobs(jobs) {
    for (var i = 0; i < jobs.length; i++) {
      var job = jobs[i]
      yield* iterateSteps(job.steps)
    }
  }
}
//上面代码中，数组jobs封装了一个项目的多个任务，Generator函数iterateJobs则是依次为这些任务加上yield *命令。

//最后，就可以用for...of循环一次性依次执行所有任务的所有步骤。
if (0) {
  for (var step of iterateJobs(jobs)) {
    console.log(step.id)
  }
}
//再次提醒，上面的做法只能用于所有步骤都是同步操作的情况，不能有异步操作的步骤。如果想要依次执行异步的步骤，必须使用后面的《异步操作》一章介绍的方法。

//for...of的本质是一个while循环，所以上面的代码实质上执行的是下面的逻辑。
if (0) {
  var it = iterateJobs(jobs)
  var res = it.next()

  while (!res.done) {
    var result = res.value
    // ...
    res = it.next()
  }
}

/**
 * （3）部署Iterator接口
利用Generator函数，可以在任意对象上部署Iterator接口。

function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}

let myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}

// foo 3
// bar 7
 */

//（4）作为数据结构
// Generator可以看作是数据结构，更确切地说，可以看作是一个数组结构，
//因为Generator函数可以返回一系列的值，这意味着它可以对任意表达式，提供类似数组的接口。
if (0) {
  function* doStuff() {
    yield fs.readFile.bind(null, 'hello.txt')
    yield fs.readFile.bind(null, 'world.txt')
    yield fs.readFile.bind(null, 'and-such.txt')
  }
}
//上面代码就是依次返回三个函数，但是由于使用了Generator函数，导致可以像处理数组那样，处理这三个返回的函数。
if (0) {
  for (task of doStuff()) {
    // task是一个函数，可以像回调函数那样使用它
  }
}
//上面的函数，可以用一模一样的for...of循环处理！两相一比较，就不难看出Generator使得数据或者操作，具备了类似数组的接口。
