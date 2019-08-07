const thunkify = require('thunkify');
const fs = require('fs');
const read = thunkify(fs.readFile);
const co = require('co');

const gen = function* (){
  var r1 = yield read('./../../assets/hello.txt');
  console.log(r1.toString())
  var r2 = yield read('./../../assets/world.txt');
  console.log(r2.toString())
}
// 使用thunkify 即 将readfile的过程拆解为3步
// 原来的调用方式 fs.readFile(filepath,callback)
// thunkify(fs.readFile)(filepath)(callback)
// 可以简单的理解为 thunkify(fn)(p1)(callback);

/**
 * @ thunkify有延迟执行的过程一个柯里化的过程
 * @ 我们通过读取文件的例子来说明
 * @1 read接收文件的路径,这时候需要将文件 yield 后面执行read方法
 * @2 it.next() 返回值 result.value 是 thunkify(fn)(p1)
 * @3 当当前result.next表示没有执行结束 则我们将next作为我们得callback传入 thunkify(fn)(p1)(next)
 * @4 当 当前的异步任务结束时 就会触发next回调 data作为返回值作为it.next(）的参数即是上一个yield的返回值 即r1 = data;
 * @5 同理 it.next() 遇到yield暂停 继续将 thunkify(fn)(p1)作为result.value的返回值 ... 递归
 * @6 直到result.done => true 所有任务执行结束,共执行了3次
 */
var times = 0;
function run(g) {
  var it = g();

  function next(err, data){
    console.log(times);

    times++;
    var result = it.next(data);
    if(result.done) return;
    result.value(next);
  }
  next();
}

// run(gen);

// 基于Promise的generator自动执行的方法

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) return reject(error);
      resolve(data);
    });
  });
};

var gen1 = function* (){
  var f1 = yield readFile('./../../assets/hello.txt');
  var f2 = yield readFile('./../../assets/world.txt');
  console.log(f1.toString());
  console.log(f2.toString());
};

function run1(g){
  var it = g();
  function next(data){
    let result = it.next(data);
    // 终止条件
    if(result.done) return result.value;
    // promise
    result.value.then(next);
  }
  next();
}

run1(gen1);