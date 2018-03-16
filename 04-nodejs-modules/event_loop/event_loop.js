// 1. log script starts
console.log('script starts');
const count = 0;
// 2. setInterval is scheduled 
// 5. microtasks stack is empty, setInteval's handler is run, anothe setInteval's handler is scheduled behind 'setTimout 1'
const clearinterval = setInterval(() => {
  console.log(`setInterval_${count}`);
}, 0);
// 3. setTimeout is scheduled as a task
setTimeout(() => {
    // 6. The microtask queue is empty, log 'setTimeout 1', 
    //`promise 3` and `promise 4` are scheduled as microtasks. 
    //`setTimeout 2` is scheduled as task
  console.log('setTimeout 1');
  Promise.resolve().then(() => {
    console.log('promise 3');
  }).then(() => {
    console.log('promise 4');
  }).then(() => {
      // 7. Microtasks stack is empty,  `setInteval`'s handler can be run, 
      //another `setInterval` is scheduled as a task, right behind `setTimeout`
    setTimeout(() => {
        // 8. `setTimeout 2`'s handler run, `promise 5` and `promise 6` are 
        //scheduled as microtasks
      console.log('setTimeout 2');
      // 9. handlers of promise 5 and promise 6 can be run clearing our interval
      Promise.resolve().then(() => {
        console.log('promise 5');
      }).then(() => {
        console.log('promise 6');
      }).then(() => {
        clearInterval(clearinterval);
      })
    }, 0);
  })
}, 0);
// 4. both thens handlers are schedules as microtasks, log messages, popped from the stack
Promise.resolve().then(() => {
  console.log('promise 1');
}).then(() => {
  console.log('promise 2');
});
/**
 * microtasks:
    *process.nextTick
    *promises
    *Object.observe
 */
/**
 * macrotasks:
   * setTimeout
   * setInterval
   * setImmediate
   * I/O
 */