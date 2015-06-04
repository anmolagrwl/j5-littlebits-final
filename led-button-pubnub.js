var five = require("johnny-five"),
button, led;

var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP
    publish_key   : "pub-c-67b64f52-9ac9-42df-9803-55fc0a646b22",
    subscribe_key : "sub-c-49d69172-3e94-11e4-8c81-02ee2ddab7fe",
    no_wait_for_pending : true
});

five.Board().on("ready", function() {

  button = new five.Button("A0");
  led = new five.Led(5);

  button.on("hit", function() {

    message = { "Button_status" : "On" };

    pubnub.publish({
      channel   : 'earthquake_frequency',
      message   : message
    });

  })

  button.on("release", function() {

    message = { "Button_status" : "Off" };

    pubnub.publish({
      channel   : 'earthquake_frequency',
      message   : message
    });
  });

  pubnub.subscribe({
    channel : 'earthquake_frequency',
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
