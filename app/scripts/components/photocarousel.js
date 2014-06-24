App.PhotoCarouselComponent = Ember.Component.extend({
    setupCarousel: function() {
        var that = this
        this.set('carouselWidth', this.$('.carousel').width())
        this.set('position', 0)
        $(window).on('resize', function() {
            that.set('carouselWidth', that.$('.carousel').width())
        })
    }.on('didInsertElement'),

    contentWidth: function() {
        return this.get('content.length') * this.get('elementWidth')
    }.property('content.length'),

    isRightScrollable: function() {
        return this.get('position') * this.get('elementWidth') + this.get('contentWidth') > this.get('carouselWidth')
    }.property('carouselWidth', 'contentWidth', 'position'),

    isLeftScrollable: function() {
        return this.get('position') < 1 && this.get('contentWidth') > this.get('carouselWidth')
    }.property('carouselWidth', 'contentWidth', 'position'),

    actions: {
        scrollRight: function() {
            this.set('position', this.get('position') - 1)
            this.$('ul').animate({
                left: '-=' + this.get('elementWidth')
            })
            return false
        },
        scrollLeft: function() {
            this.set('position', this.get('position') + 1)
            this.$('ul').animate({
                left: '+=' + this.get('elementWidth')
            })
            return false
        },
        overlayItem: function(item) {
            this.set('currentItem', item)
            this.$('.modal').modal()
        }
    }
})
