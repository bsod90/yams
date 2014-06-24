App.EventsWizardView = Ember.View.extend({
    setupWizard: function() {
        $('.wizard-overflow').slimScroll({
            height: 'auto',
            wheelStep: 10
        })
        var that = this
        $('.wizard-overflow').on('scroll', function(e) {
            that.updateActiveAnchor()
        });
        this.set('halfOverflowHeight', $('.wizard-overflow').height() / 2)
        $(window).on('resize', function() {
            that.set('halfOverflowHeight', $('.wizard-overflow').height() / 2)
        })
        this.updateActiveAnchor()
    }.on('didInsertElement'),

    updateActiveAnchor: function() {
        var that = this
        var halfHeight = this.get('halfOverflowHeight')
        $('.wizard-row').each(function() {
            var $anchor = $(this).find('a').first()
            if ($anchor.position().top <= halfHeight && $anchor.position().top >= 0) {
                var anchorName = $(this).find('a').first().attr('id')
                if (that.get('activeAnchor') != anchorName)
                    that.set('activeAnchor', anchorName)
                return false
            }
        })
    },

    isDescribeActive: function() {
        return this.get('activeAnchor') == 'describe'
    }.property('activeAnchor'),

    isPeopleActive: function() {
        return this.get('activeAnchor') == 'people'
    }.property('activeAnchor'),

    isLocationActive: function() {
        return this.get('activeAnchor') == 'location'
    }.property('activeAnchor'),

    isUploadsActive: function() {
        return this.get('activeAnchor') == 'uploads'
    }.property('activeAnchor'),

    actions: {
        scrollTo: function(anchor) {
            $('.wizard-overflow').slimScroll({
                scrollTo: $('#' + anchor).position().top + $('.wizard-overflow').scrollTop(),
                animate: true
            })
            return false
        }
    }
})
