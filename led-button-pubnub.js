var five = require("johnny-five"),
button, led;

var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP
    publish_key   : "demo",
    subscribe_key : "demo",
    no_wait_for_pending : true
});

five.Board().on("ready", function() {

  button = new five.Button("A0");
  led = new five.Led(5);

  button.on("hit", function() {

    message = { "Button_status" : "On" };

    pubnub.publish({
      channel   : 'j5-pubnub',
      message   : message
    });

  })

  button.on("release", function() {

    message = { "Button_status" : "Off" };

    pubnub.publish({
      channel   : 'j5-pubnub',
      message   : message
    });
  });

  pubnub.subscribe({
    channel : 'j5-pubnub',
    message : function (data) {
      console.log(data);
      if (data.Button_status == "On") {
        led.on();
      } else if (data.Button_status == "Off"){
        led.off();
      }
    }
  })

});
