const fs = require('fs');
function co(gen) {
  const ctx = this;
  return new Promise((resolve, reject)=>{
    if(typeof gen === 'function') gen = gen.call(ctx)
    if(!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();
    function onFulfilled(res){
      var ret;
      try {
        ret = gen.next(res);
      }catch(e){
        return reject(e);
      }
      next(ret)
    }

    function onRejected(err){
      var ret;
      try{
        ret = gen.throw(err);
      }catch(e){
        return reject(e);
      } 
      next(ret);
    }

    function next(ret){
      if(ret.done) return resolve(ret.value);
      var value = ret.value;
      if(value && 'function' == typeof Object.then) return value.then(onFulfilled,onRejected);
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
      + 'but the following object was passed: "' + String(ret.value) + '"'));
    }
  });
}
