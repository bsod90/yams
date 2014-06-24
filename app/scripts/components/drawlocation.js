App.DrawLocationComponent = Ember.Component.extend({
    setupMap: function() {
        var center = new google.maps.LatLng(this.get('location.geopoint.latitude'), this.get('location.geopoint.longitude'))
        var mapOptions = {
            center: center,
            zoom: 11
        }
        this.map = new google.maps.Map(this.$('.address-picker-map').get(0), mapOptions)
        this.marker = new google.maps.Marker({
            position: center,
            map: this.map,
            title: this.get('location.address')
        })
    }.on('didInsertElement'),

    locationChanged: function() {
        Ember.run.once(this, function() {
            var center = new google.maps.LatLng(this.get('location.geopoint.latitude'), this.get('location.geopoint.longitude'))
            this.map.setCenter(center)
            this.marker.setPosition(center)
        })
    }.observes('location.geopoint.latitude', 'location.geopoint.longitude')
});
