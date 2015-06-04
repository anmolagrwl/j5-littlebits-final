var five = require("johnny-five"),
bumper, led;

five.Board().on("ready", function() {

  bumper = new five.Button("A0");
  led = new five.Led(1);

  bumper.on("hit", function() {

    led.on();

  })

  bumper.on("release", function() {

    led.off();

  });
});
