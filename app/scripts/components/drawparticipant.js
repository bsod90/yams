App.DrawParticipantComponent = Ember.Component.extend({

    classNames: ['participant', 'top-margin'],

    isPending: function() {
        return this.get('participant.acceptanceStatus') == 'pending'
    }.property('participant.acceptanceStatus'),

    isAccepted: function() {
        return this.get('participant.acceptanceStatus') == 'accepted'
    }.property('participant.acceptanceStatus'),

    isRejected: function() {
        return this.get('participant.acceptanceStatus') == 'rejected'
    }.property('participant.acceptanceStatus'),

    isNotYetDecide: function() {
        return this.get('participant.acceptanceStatus') == 'maybe'
    }.property('participant.acceptanceStatus'),


});
