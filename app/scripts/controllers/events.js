App.EventsIndexController = Ember.Controller.extend({
    needs: ['login'],

    actions: {
        createEvent: function() {
            var that = this
            // Temporary solution, replace when we have authentication
            var newEvent = that.store.createRecord('event', {
                public: true,
                location: Ember.Object.create({
                    address: '',
                    geopoint: Ember.Object.create({})
                }),
                creator: this.get('controllers.login.user')
            })
            newEvent.save().then(function() {
                that.transitionToRoute('events.wizard', newEvent)
            })
        }
    }
})
