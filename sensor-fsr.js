var five = require("johnny-five"),
  fsr, led;

(new five.Board()).on("ready", function() {

    // Create a new `fsr` hardware instance.
    fsr = new five.Sensor({
      pin: "A0",
      freq: 25
    });

    led = new five.Led(5);

    // Scale the sensor's value to the LED's brightness range
    fsr.scale([0, 255]).on("data", function() {

      // set the led's brightness based on force
      // applied to force sensitive resistor

      led.brightness(this.value);
    });
  });
