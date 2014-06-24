DATE_FORMAT = 'DD MMM YYYY H:mm'

App.DateRangeComponent = Ember.Component.extend({
    setupDateRange: function() {
        var that = this;
        this.$('.input-daterange').daterangepicker({
            timePicker: true,
            timePickerIncrement: 10,
            timePicker12Hour: false,
            format: DATE_FORMAT
        }).on('apply.daterangepicker', function(evt, picker) {
            that.set('formattedRange', picker.startDate.format(DATE_FORMAT) + ' - ' + picker.endDate.format(DATE_FORMAT))
        })
    }.on('didInsertElement'),

    inputChanged: function() {
        var range = this.parsedRange()
        if (range[0] && range[0] != this.get('startDate'))
            this.set('startDate', range[0])
        if (range[1] && range[1] != this.get('endDate'))
            this.set('endDate', range[1])
    }.observes('formattedRange'),

    parsedRange: function() {
        if (this.get('formattedRange')) {
            var chunks = this.get('formattedRange').split('-')
            var startDate = moment(chunks[0], DATE_FORMAT),
                endDate = moment(chunks[1], DATE_FORMAT);
            return [startDate, endDate]
        } else {
            return [undefined, undefined]
        }
    },

    datesChanged: function() {
        var startDate = this.get('startDate')
        var endDate = this.get('endDate')
        var currentRange = this.parsedRange()
        if (startDate && endDate) {
            if (currentRange[0] != startDate || currentRange[1] != endDate)
                this.set('formattedRange', startDate.format(DATE_FORMAT) + ' - ' + endDate.format(DATE_FORMAT))
        }
    }.observes('startDate', 'endDate').on('init')
});
