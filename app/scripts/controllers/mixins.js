App.EventBackgroundMixin = Ember.Mixin.create({
    coverChanged: function() {
        this.updateBackground()
    }.observes('model.cover.url'),

    updateBackground: function() {
        if (this.get('model.cover.url')) {
            $('html').css('background-image', 'url(' + this.get('model.cover.url') + ')')
        }
    }
})
