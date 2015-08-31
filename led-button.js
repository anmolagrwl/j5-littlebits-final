var five = require("johnny-five"),
button, led;

five.Board().on("ready", function() {

  button = new five.Button("A0");
  led = new five.Led(1);

  button.on("hit", function() {
    led.on();
  })

  button.on("release", function() {
    led.off();
  });
});
