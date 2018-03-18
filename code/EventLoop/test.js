console.log('golb1');
setImmediate(function() {
  console.log('immediate1');
  process.nextTick(function() {
    console.log('immediate1_nextTick');
  })
  new Promise(function(resolve) {
    console.log('immediate1_promise');
    resolve();
  }).then(function() {
    console.log('immediate1_then')
  })
})

setTimeout(function() {
  console.log('timeout1');
  process.nextTick(function() {
    console.log('timeout1_nextTick');
  })
  new Promise(function(resolve) {
    console.log('timeout1_promise');
    resolve();
  }).then(function() {
    console.log('timeout1_then')
  })

  setTimeout(function() {
    console.log('timeout1_timeout1');
    process.nextTick(function() {
      console.log('timeout1_timeout1_nextTick');
    })
    setImmediate(function() {
      console.log('timeout1_setImmediate1');
    })
  });
})
new Promise(function(resolve) {
  console.log('glob1_promise');
  resolve();
}).then(function() {
  console.log('glob1_then')
})
process.nextTick(function() {
  console.log('glob1_nextTick');
})

/* 
golb1
glob1_promise
glob1_nextTick
glob1_then
timeout1
timeout1_promise
timeout1_nextTick
timeout1_then
immediate1
immediate1_promise
immediate1_nextTick
immediate1_then
timeout1_timeout1
timeout1_timeout1_nextTick
timeout1_setImmediate1
 */