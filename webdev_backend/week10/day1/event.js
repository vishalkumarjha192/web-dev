// import eventEmitter class from event modules
var EventEmitter = require('events')

// ee object
var ee = new EventEmitter()

// Hanldeling/ read
// on = > method name, messges => Event Name
ee.on('message', function (text) {
  console.log(text)
})

// Trigger/Sending Data
// emit => Method for  triggering
ee.emit('message', 'hello world')


