var Messages;
Messages = new Meteor.Collection("messages");

if (Meteor.is_client) {
  window.Messages = Messages;
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
