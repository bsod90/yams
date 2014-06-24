var DateFormats = {
    short: "DD MMMM YYYY",
    'short+time': "DD MMMM YYYY HH:mm",
    long: "dddd DD.MM.YYYY HH:mm"
};

Ember.Handlebars.helper("formatDate", function(datetime, format) {
    if (!datetime) {
        return ''
    }
    if (moment) {
        if (format != 'fromnow') {
            f = DateFormats[format];
            return datetime.format(f)
        } else {
            return datetime.fromNow()
        }
    } else {
        return datetime;
    }
});
