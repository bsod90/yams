App.LoginController = Ember.ArrayController.extend({
    isAuthenticated: function() {
        return !!this.get('user')
    }.property('user'),

    transitionToNextUrl: function() {
        if (this.get('nextUrl')) {
            var nextUrl = this.get('nextUrl')
            this.set('nextUrl', null)
            this.transitionToRoute(nextUrl)
        } else {
            this.transitionToRoute('index')
        }
    },

    actions: {
        loginAs: function(user) {
            this.set('user', user)
            this.transitionToNextUrl()
        },
        signOut: function() {
            this.set('user', null)
            this.transitionToNextUrl()
        }
    }
})
