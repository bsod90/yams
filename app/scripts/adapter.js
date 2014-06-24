DS.RESTSerializer.reopen({
    /**
     The current ID index of generated IDs
     @property
     @private
    */
    _generatedIds: 0,

    /**
     Sideload a JSON object to the payload
      
     @method sideloadItem
     @param {Object} payload   JSON object representing the payload
     @param {subclass of DS.Model} type   The DS.Model class of the item to be sideloaded
     @param {Object} item JSON object   representing the record to sideload to the payload
    */
    sideloadItem: function(payload, type, item) {
        var sideloadKey = type.typeKey.pluralize(), // The key for the sideload array 
            sideloadArr = payload[sideloadKey] || [], // The sideload array for this item
            primaryKey = Ember.get(this, 'primaryKey'), // the key to this record's ID
            id = item[primaryKey];

        // Missing an ID, generate one
        if (typeof id == 'undefined') {
            id = 'generated-' + (++this._generatedIds);
            item[primaryKey] = id;
        }

        // Don't add if already side loaded
        if (sideloadArr.findBy("id", id) != undefined) {
            return payload;
        }

        // Add to sideloaded array
        sideloadArr.push(item);
        payload[sideloadKey] = sideloadArr;
        return payload;
    },

    /**
     Extract relationships from the payload and sideload them. This function recursively 
     walks down the JSON tree
      
     @method sideloadItem
     @param {Object} payload   JSON object representing the payload
     @paraam {Object} recordJSON   JSON object representing the current record in the payload to look for relationships
     @param {Object} recordType   The DS.Model class of the record object
    */
    extractRelationships: function(payload, recordJSON, recordType) {
        // Loop through each relationship in this record type
        recordType.eachRelationship(function(key, relationship) {
            var related = recordJSON[key], // The record at this relationship
                type = relationship.type; // belongsTo or hasMany

            if (related) {

                // One-to-one
                if (relationship.kind == "belongsTo" && relationship.options.embedded == 'always') {
                    // Sideload the object to the payload
                    this.sideloadItem(payload, type, related);

                    // Replace object with ID
                    recordJSON[key] = related.id;

                    // Find relationships in this record
                    this.extractRelationships(payload, related, type);
                }

                // Many
                else if (relationship.kind == "hasMany" && relationship.options.embedded == 'always') {

                    // Loop through each object
                    related.forEach(function(item, index) {

                        // Sideload the object to the payload
                        this.sideloadItem(payload, type, item);

                        // Replace object with ID
                        related[index] = item.id;

                        // Find relationships in this record
                        this.extractRelationships(payload, item, type);
                    }, this);
                }

            }
        }, this);

        return payload;
    },


    extractSingle: function(store, type, payload, id) {
        var typeKey = type.typeKey

        var newPayload = {}
        newPayload[typeKey] = payload

        if (typeof newPayload[typeKey] != "undefined") {
            this.extractRelationships(newPayload, newPayload[typeKey], type);
        }

        return this._super(store, type, newPayload, id)
    },

    extractArray: function(store, type, payload) {
        var typeKeyPlural = type.typeKey.pluralize()
        var newPayload = {}
        newPayload[typeKeyPlural] = payload['data']

        // Many items (findMany, findAll)
        if (typeof newPayload[typeKeyPlural] != "undefined") {
            newPayload[typeKeyPlural].forEach(function(item, index) {
                this.extractRelationships(newPayload, item, type);
            }, this);
        }

        return this._super(store, type, newPayload)
    },


    serializeHasMany: function(record, json, relationship) {
        var key = relationship.key,
            hasManyRecords = Ember.get(record, key);

        // Embed hasMany relationship if records exist
        if (hasManyRecords && relationship.options.embedded == 'always') {
            json[key] = [];
            hasManyRecords.forEach(function(item, index) {
                json[key].push(item.serialize());
            });
        }
        // Fallback to default serialization behavior
        else {
            return this._super(record, json, relationship);
        }
    },

    serializeBelongsTo: function(record, json, relationship) {
        var key = relationship.key,
            belongsToRecord = Ember.get(record, key);

        if (relationship.options.embedded === 'always') {
            json[key] = belongsToRecord.serialize();
        } else {
            return this._super(record, json, relationship);
        }
    },

    serializeIntoHash: function(hash, type, record, options) {
        Ember.merge(hash, this.serialize(record, options))
    }

});


App.ApplicationAdapter = DS.RESTAdapter.extend({
    //serializer: DS.YAMSSerializer,
    host: 'http://localhost:5000',
    namespace: 'api/v1',

    buildURL: function(type, id) {
        var url = this._super(type, id)
        if (url.charAt(url.length - 1) != '/') {
            url = url + '/'
        }
        return url
    }
});
