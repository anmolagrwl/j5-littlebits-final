var five = require("johnny-five");
var board = new five.Board();
var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP 
    publish_key   : "pub-c-67b64f52-9ac9-42df-9803-55fc0a646b22",
    subscribe_key : "sub-c-49d69172-3e94-11e4-8c81-02ee2ddab7fe",
    no_wait_for_pending : true
});

var frequency, message;

board.on("ready", function() {

  var sensor = new five.Sensor({
    pin: "A0",
    freq: 200
  });

  this.repl.inject({
    sensor: sensor
  });

  sensor.scale([0, 10]).on("data", function() {
    // console.log(this.value, this.raw);
    console.log(this.value.toFixed(2));
    frequency = this.value.toFixed(2);
    message = { "Magnitude" : frequency };

    pubnub.publish({ 
      channel   : 'earthquake_frequency',
      message   : message
      // callback  : function(e) { console.log( "SUCCESS!", e ); },
      // error     : function(e) { console.log( "FAILED! RETRY PUBLISH!", e ); }
    });

  });

});

