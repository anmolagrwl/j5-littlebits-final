var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  var led = new five.Led(5);

  led.fadeIn();

  // Toggle the led after 5 seconds (shown in ms)
  this.wait(5000, function() {
    led.fadeOut();
  });
});