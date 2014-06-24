App.PublicPrivateComponent = Ember.Component.extend({
    title: function() {
        return this.get('checked') ? "Anyone who has the link can see this event" : "Only invited participants can see this event"
    }.property('checked')
})
