var Messages;
Messages = new Meteor.Collection("messages");

if (Meteor.isServer) {
  Meteor.publish("messages", function () {
    return Messages.find({});
  })

  Messages.allow({
    insert: function () {
      return true;
    }
  })
}

if (Meteor.isClient) {
  Meteor.autosubscribe(function () {
    Meteor.subscribe("messages");
  })

  Template.messages.messages = function() {
    return Messages.find({});
  };

  Template.newMessage.events = {
    'keyup #newMessage': function(event) {
      var name, newMessage;
      if (event.type === "keyup" && event.which === 13) {
        newMessage = $("#newMessage");
        name = $("#name");
        if (name !== ""){
          Messages.insert({
            name: name.val(),
            message: newMessage.val(),
            timestamp: new Date()
          });
        }
        newMessage.val("");
        newMessage.focus();
        return $("#chat").scrollTop(9999999);
      }
    }
  };
}
