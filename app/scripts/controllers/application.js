App.ApplicationController = Ember.Controller.extend({
    needs: ['login'],

    actions: {
        askForLogin: function() {
            this.set('controllers.login.nextUrl', window.location.hash.substr(1))
            this.transitionToRoute('login')
        }
    }
})
