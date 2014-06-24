var App = Ember.Application.create();

// //Temporary solution
// //----
// App.jsonSerializer = DS.JSONSerializer.extend({
//     serializeHasMany: function(record, json, relationship) {
//         var key = relationship.key;

//         var relationshipType = DS.RelationshipChange.determineRelationshipType(
//             record.constructor, relationship);

//         if (relationshipType === 'manyToNone' ||
//             relationshipType === 'manyToMany' ||
//             relationshipType === 'manyToOne') {
//             json[key] = Ember.get(record, key).mapBy('id');
//             // TODO support for polymorphic manyToNone and manyToMany
//             // relationships
//         }
//     }
// });
// App.EventSerializer = App.jsonSerializer
// //----

//--- Global fix for textarea, do submit on Ctrl+Enter
Ember.TextArea.reopen({
    insertNewline: function(event) {
        if (event.ctrlKey) {
            this._super(event);
        }
    }
});
//----

App.Router.map(function() {
    this.resource('events', {
        path: '/events'
    }, function() {
        this.resource('events.wizard', {
            path: '/wizard/:event_id'
        })
    });

    this.resource('event', {
        path: '/event/:event_id'
    });

    this.resource('login', {
        path: 'login'
    });
})

App.IndexRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('events')
    }
})

App.EventsWizardRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('event', params.event_id)
    },
    setupController: function(controller, model) {
        controller.set('model', model)
        filepicker.setKey('ACsJusYPJTiKBCFknORejz');
    }
})

App.EventRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        //Make sure we display freshest data
        controller.set('model', model)
        controller.set('user', model.get('creator'))
    }
})

App.LoginRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('user')
    }
})
