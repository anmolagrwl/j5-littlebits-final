var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  var slider = new five.Sensor("A0");

  // "slide" is an alias for "change"
  slider.scale([0, 100]).on("slide", function() {
    console.log("slide", this.value);
  });
});
