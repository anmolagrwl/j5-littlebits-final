// buggy

var five = require("johnny-five"),
  board, button;

board = new five.Board({port:'/dev/tty.usbmodem1411'});

board.on("ready", function() {

  // Create a new `button` hardware instance.
  // This example allows the button module to
  // create a completely default instance
  button = new five.Button(0);
  var led = (new five.Led(1));

  led.off();
  // Inject the `button` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    button: button,
    led: led
  });

  // Button Event API

  // "down" the button is pressed
  button.on("down", function() {
    console.log("down");
    led.on();
  });

  // "hold" the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  button.on("hold", function() {
    console.log("hold");
    led.on();
  });

  // "up" the button is released
  button.on("up", function() {
    console.log("up");
    led.off();
  });
});