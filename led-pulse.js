var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  // Create a standard `led` component
  // on a valid pwm pin
  var led = new five.Led(5);

  led.pulse();

  // Stop and turn off the led pulse loop after
  // 10 seconds (shown in ms)
  this.wait(10000, function() {

    // stop() terminates the interval
    // off() shuts the led off
    led.stop().off();
  });
});