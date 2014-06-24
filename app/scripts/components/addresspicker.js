App.AddressPickerComponent = Ember.Component.extend({
    setupAddressPicker: function() {
        this.addressPicker = new AddressPicker({
            map: {
                id: '#' + this.get('mapId'),
                zoom: 11,
                scrollwheel: false
            }
        });
        var that = this

        var element = this.$('.addresspicker').typeahead(null, {
            displayKey: 'description',
            source: that.addressPicker.ttAdapter()
        });
        element.on("typeahead:selected", this.addressPicker.updateMap)
        element.on("typeahead:cursorchanged", this.addressPicker.updateMap)

        $(this.addressPicker).on('addresspicker:selected', function(event, result) {
            that.set('lat', result.lat())
            that.set('lng', result.lng())
        });
        this.updateMap()
        return element
    }.on('didInsertElement'),

    updateMap: function() {
        if (this.get('lat') && this.get('lng')) {
            var latlng = new google.maps.LatLng(this.get('lat'), this.get('lng'));
            this.addressPicker.marker.setPosition(latlng)
            this.addressPicker.marker.setVisible(true)
            this.addressPicker.map.setCenter(latlng)
        }
    },

    positionChanged: function() {
        Ember.run.once(this, function() {
            this.updateMap()
        })
    }.observes('lat', 'lng'),

    _mapId: undefined,

    mapId: function() {
        this._mapId = this._mapId || 'map-' + guid()
        return this._mapId
    }.property('mapId')
});
