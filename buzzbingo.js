// buzzwords -- {word: String, hits: Number}
Buzzwords = new Meteor.Collection('buzzwords');

// chat -- {msg: String, when: timestamp}
Chat = new Meteor.Collection('chat');
    
if (Meteor.isClient) {

  Template.buzzwordList.buzzwords = Buzzwords.find();
  Template.buzzwordList.events({
      'click': function() {
          this.hits = this.hits += 1;
          Buzzwords.update({_id: this._id}, {$set: {hits: this.hits}});
          console.log(this);
      }
  });

Template.newbz.events({
  'submit form': function(e){
      var n = {word: e.currentTarget.querySelector('input').value,
               hits: 0};
      Buzzwords.insert(n);
      e.currentTarget.querySelector('input').value = '';
      e.preventDefault();
  }});
    
Template.chats.chat = Chat.find({},{sort: {when: -1}});

Template.newchat.events({
  'submit form': function(e){
      var n = {msg: e.currentTarget.querySelector('input').value,
               when: new Date().getTime()};
      
      Chat.insert(n);
      e.currentTarget.querySelector('input').value = '';
      e.preventDefault();
  }});
    Meteor.subscribe("all-bw");
    Meteor.subscribe("all-chat");
}

if (Meteor.isServer) {
  Meteor.publish(
      "all-bw",
      function () {return Buzzwords.find({}, {sort: {hits:-1}});}
  );
  Meteor.publish(
      "all-chat",
      function () {return Chat.find({}, {sort: {when: 1}});}
  );
    
  Meteor.startup(function () {
  });
}
