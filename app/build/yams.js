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
;var App = Ember.Application.create();

// //Temporary solution
// //----
// App.jsonSerializer = DS.JSONSerializer.extend({
//     serializeHasMany: function(record, json, relationship) {
//         var key = relationship.key;

//         var relationshipType = DS.RelationshipChange.determineRelationshipType(
//             record.constructor, relationship);

//         if (relationshipType === 'manyToNone' ||
//             relationshipType === 'manyToMany' ||
//             relationshipType === 'manyToOne') {
//             json[key] = Ember.get(record, key).mapBy('id');
//             // TODO support for polymorphic manyToNone and manyToMany
//             // relationships
//         }
//     }
// });
// App.EventSerializer = App.jsonSerializer
// //----

//--- Global fix for textarea, do submit on Ctrl+Enter
Ember.TextArea.reopen({
    insertNewline: function(event) {
        if (event.ctrlKey) {
            this._super(event);
        }
    }
});
//----

App.Router.map(function() {
    this.resource('events', {
        path: '/events'
    }, function() {
        this.resource('events.wizard', {
            path: '/wizard/:event_id'
        })
    });

    this.resource('event', {
        path: '/event/:event_id'
    });

    this.resource('login', {
        path: 'login'
    });
})

App.IndexRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('events')
    }
})

App.EventsWizardRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('event', params.event_id)
    },
    setupController: function(controller, model) {
        controller.set('model', model)
        filepicker.setKey('ACsJusYPJTiKBCFknORejz');
    }
})

App.EventRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        //Make sure we display freshest data
        controller.set('model', model)
        controller.set('user', model.get('creator'))
    }
})

App.LoginRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('user')
    }
})
;App.AddressPickerComponent = Ember.Component.extend({
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
;DATE_FORMAT = 'DD MMM YYYY H:mm'

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
;App.DrawLocationComponent = Ember.Component.extend({
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
;App.DrawParticipantComponent = Ember.Component.extend({

    classNames: ['participant', 'top-margin'],

    isPending: function() {
        return this.get('participant.acceptanceStatus') == 'pending'
    }.property('participant.acceptanceStatus'),

    isAccepted: function() {
        return this.get('participant.acceptanceStatus') == 'accepted'
    }.property('participant.acceptanceStatus'),

    isRejected: function() {
        return this.get('participant.acceptanceStatus') == 'rejected'
    }.property('participant.acceptanceStatus'),

    isNotYetDecide: function() {
        return this.get('participant.acceptanceStatus') == 'maybe'
    }.property('participant.acceptanceStatus'),


});
;var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
    '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

App.EmailBarComponent = Ember.Component.extend({
    setupEmailBar: function() {
        var that = this
        this.get('event.participants').then(function(participants) {
            var $select = that.$('.emailbar').selectize({
                persist: false,
                maxItems: null,
                valueField: 'email',
                labelField: 'name',
                searchField: ['name', 'email'],
                render: {
                    item: function(item, escape) {
                        return '<div>' +
                            (item.fullName ? '<span class="name">' + escape(item.fullName) + '</span>' : '') +
                            (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
                            '</div>';
                    },
                    option: function(item, escape) {
                        var label = item.fullName || item.email;
                        var caption = item.fullName ? item.email : null;
                        return '<div>' +
                            '<span class="selectize-label">' + escape(label) + '</span>' +
                            (caption ? '<span class="selectize-caption">' + escape(caption) + '</span>' : '') +
                            '</div>';
                    }
                },
                create: function(input) {
                    if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
                        return {
                            email: input
                        }
                    }
                    var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
                    if (match) {
                        return {
                            email: match[2],
                            firstName: $.trim(match[1])
                        }
                    }
                    return false;
                },
                load: function(query, callback) {
                    that.get('targetObject.store').find('user', {
                        email: query
                    }).then(function(users) {
                        callback(users.content.map(function(user) {
                            return {
                                fullName: user.get('fullName'),
                                email: user.get('email')
                            }
                        }))
                    })
                },
                onItemAdd: function(value, $item) {
                    that.get('event.participants').then(function(participants) {
                        var found = false
                        participants.forEach(function(participant) {
                            if (participant.get('user.email') == value) {
                                found = true
                            }
                        })
                        if (!found) {
                            that.get('targetObject.store').find('user', {
                                email: value
                            }).then(function(found) {
                                var invitation = that.get('targetObject.store').createRecord('invitation', {
                                    event: that.get('event'),
                                    acceptanceStatus: 'pending'
                                })
                                invitation.save()
                                //TODO: Remove when ember will be able to pickup this automatically
                                that.get('event.participants').then(function(participants) {
                                    participants.addObject(invitation)
                                })
                                if (found.get('length') == 0) {
                                    var user = that.get('targetObject.store').createRecord('user', {
                                        email: email
                                    })
                                } else {
                                    var user = found.objectAt(0)
                                }
                                invitation.set('user', user)
                            })
                        }
                    })
                },
                onItemRemove: function(value) {
                    that.get('event.participants').then(function(participants) {
                        participants.forEach(function(participant) {
                            if (participant.get('user.email') == value) {
                                participants.removeObject(participant)
                                participant.destroyRecord()
                            }
                        })
                    })
                }
            })
            that.selectize = $select[0].selectize
            participants.forEach(function(participant) {
                that.get('targetObject.store').find('user', participant.get('user.id')).then(function(user) {
                    var value = {
                        fullName: user.get('fullName'),
                        email: user.get('email')
                    }
                    that.selectize.addOption(value)
                    that.selectize.addItem(value.email)
                })
            })
        })
    }.on('didInsertElement')
});
;App.PhotoCarouselComponent = Ember.Component.extend({
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
;App.PublicPrivateComponent = Ember.Component.extend({
    title: function() {
        return this.get('checked') ? "Anyone who has the link can see this event" : "Only invited participants can see this event"
    }.property('checked')
})
;App.ApplicationController = Ember.Controller.extend({
    needs: ['login'],

    actions: {
        askForLogin: function() {
            this.set('controllers.login.nextUrl', window.location.hash.substr(1))
            this.transitionToRoute('login')
        }
    }
})
;App.EventController = Ember.ObjectController.extend(App.EventBackgroundMixin, {
    needs: ['login'],
    
    canEdit: function() {
        return this.get('user') == this.get('model.creator')
    }.property('model.creator'),

    actions: {
        postComment: function() {
            if (!this.get('newComment'))
                return
            var evt = this.get('model')
            var comment = this.get('store').createRecord('comment', {
                event: evt,
                author: this.get('user'),
                creationTime: moment(new Date()),
                message: this.get('newComment')
            })
            comment.save().then(function() {
                evt.reload()
            })
            this.set('newComment', '')
        },

        toggleEditMode: function() {
            this.set('editMode', true)
        },

        saveChanges: function() {
            this.get('model').save()
            this.set('editMode', false)
        }
    }
})
;App.EventsIndexController = Ember.Controller.extend({
    needs: ['login'],

    actions: {
        createEvent: function() {
            var that = this
            // Temporary solution, replace when we have authentication
            var newEvent = that.store.createRecord('event', {
                public: true,
                location: Ember.Object.create({
                    address: '',
                    geopoint: Ember.Object.create({})
                }),
                creator: this.get('controllers.login.user')
            })
            newEvent.save().then(function() {
                that.transitionToRoute('events.wizard', newEvent)
            })
        }
    }
})
;App.LoginController = Ember.ArrayController.extend({
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
;App.EventBackgroundMixin = Ember.Mixin.create({
    coverChanged: function() {
        this.updateBackground()
    }.observes('model.cover.url'),

    updateBackground: function() {
        if (this.get('model.cover.url')) {
            $('html').css('background-image', 'url(' + this.get('model.cover.url') + ')')
        }
    }
})
;App.EventsWizardController = Ember.ObjectController.extend(App.EventBackgroundMixin, {
    needs: ['login'],

    actions: {
        upload: function() {
            var that = this
            filepicker.pickAndStore({
                mimetype: "image/*",
                folders: true,
                multiple: true
            }, {
                location: "S3"
            }, function(InkBlobs) {
                InkBlobs.forEach(function(InkBlob) {
                    var picture = that.store.createRecord('picture', {
                        url: InkBlob.url,
                        filename: InkBlob.filename,
                        event: that.get('model')
                    })
                    picture.save().then(function() {
                        //TODO: Remove when ember will be able to pickup this automatically
                        that.get('model.pictures').then(function(pictures) {
                            pictures.addObject(picture)
                        })
                        filepicker.convert(InkBlob, {
                                width: 100,
                                height: 100,
                                fit: 'clip'
                            },
                            function(new_InkBlob) {
                                var thumbnail = that.store.createRecord('thumbnail', {
                                    url: new_InkBlob.url,
                                    filename: new_InkBlob.filename,
                                    picture: picture
                                })
                                thumbnail.save().then(function() {
                                    picture.set('thumbnail', thumbnail)
                                    picture.save()
                                })
                            }
                        );
                    })
                })
            });
        },
        setCover: function(cover) {
            var evt = this.get('model')
            evt.set('cover', cover)
        },
        remove: function(picture) {
            this.get('model.pictures').then(function(pictures) {
                pictures.removeObject(picture)
                if (picture.get('thumbnail')) {
                    filepicker.remove({
                        url: picture.get('thumbnail').get('url')
                    })
                    picture.get('thumbnail').destroyRecord()
                }
                filepicker.remove({
                    url: picture.get('url')
                })
                picture.destroyRecord()
            })
        },
        publishEvent: function() {
            this.get('model').save()
            this.transitionToRoute('event', this.get('model.id'))
        }
    }
})
;App.Event.FIXTURES = [{
    id: 'event-1',
    title: 'Party for everybody',
    description: 'Some description',
    public: true,
    location: 'location-1',
    creator: 'user-1',
    startDate: moment(new Date()),
    endDate: moment(new Date()).add('days', 3),
    pictures: [
        'picture-1',
        'picture-2',
        'picture-3',
        'picture-4',
        'picture-5',
        'picture-6',
        'picture-7',
        'picture-8',
        'picture-9'
    ],
    cover: 'picture-2',
    participants: [
        'inv-1',
        'inv-2',
        'inv-3',
        'inv-4'
    ],
    comments: [
        'comment-1',
        'comment-2',
        'comment-3'
    ]
}]

App.Location.FIXTURES = [{
    id: 'location-1',
    address: 'Минск, Кедышко 26Б',
    latitude: 53.93367629999999,
    longitude: 27.631788899999947
}]

App.Invitation.FIXTURES = [{
    id: 'inv-1',
    user: 'user-1',
    event: 'event-1',
    acceptanceStatus: 'pending',
    link: 'http://localhost:8000/#join_event/1234'
}, {
    id: 'inv-2',
    user: 'user-3',
    event: 'event-1',
    acceptanceStatus: 'accepted',
    link: 'http://localhost:8000/#join_event/1234'
}, {
    id: 'inv-3',
    user: 'user-5',
    event: 'event-1',
    acceptanceStatus: 'rejected',
    link: 'http://localhost:8000/#join_event/1234'
}, {
    id: 'inv-4',
    user: 'user-2',
    event: 'event-1',
    acceptanceStatus: 'maybe',
    link: 'http://localhost:8000/#join_event/1234'
}]

App.User.FIXTURES = [{
    id: 'user-1',
    firstName: 'Maxim',
    lastName: 'Leonovich',
    email: 'lm.bsod@gmail.com'
}, {
    id: 'user-2',
    firstName: 'Andrew',
    lastName: 'Fan',
    email: 'beeprojectby@gmail.com',
}, {
    id: 'user-3',
    firstName: 'Superman',
    email: 'super@man.com'
}, {
    id: 'user-4',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com'
}, {
    id: 'user-5',
    firstName: 'Федор',
    lastName: 'Хрущев',
    email: 'name.xru@gmail.com'
}, {
    id: 'user-6',
    firstName: 'Lunch',
    lastName: 'for Me',
    email: 'info@lunch-for.me'
}, {
    id: 'user-7',
    firstName: 'Dmitry',
    lastName: 'Vechorko',
    email: 'dmitry.vechorko@upsilonit.com'
}, {
    id: 'user-8',
    firstName: 'Nadzeya',
    lastName: 'Valkouskaya',
    email: 'tsiramisu@gmail.com'
}]

App.Picture.FIXTURES = [{
    id: 'picture-1',
    url: 'https://www.filepicker.io/api/file/lhDg6lzvQRuLJe2iUqUN',
    filename: 'avatar.png',
    event: 'event-1',
    thumbnail: 'thumbnail-1'
}, {
    id: 'picture-2',
    url: 'https://www.filepicker.io/api/file/IvzcfvBSSY2iJQ4OqKdP',
    filename: 'denis',
    event: 'event-1',
    thumbnail: 'thumbnail-2'
}, {
    id: 'picture-3',
    url: 'https://www.filepicker.io/api/file/IvzcfvBSSY2iJQ4OqKdP',
    filename: 'denis',
    event: 'event-1',
    thumbnail: 'thumbnail-2'
}, {
    id: 'picture-4',
    url: 'https://www.filepicker.io/api/file/IvzcfvBSSY2iJQ4OqKdP',
    filename: 'denis',
    event: 'event-1',
    thumbnail: 'thumbnail-2'
}, {
    id: 'picture-5',
    url: 'https://www.filepicker.io/api/file/IvzcfvBSSY2iJQ4OqKdP',
    filename: 'denis',
    event: 'event-1',
    thumbnail: 'thumbnail-2'
}, {
    id: 'picture-6',
    url: 'https://www.filepicker.io/api/file/IvzcfvBSSY2iJQ4OqKdP',
    filename: 'denis',
    event: 'event-1',
    thumbnail: 'thumbnail-2'
}, {
    id: 'picture-7',
    url: 'https://www.filepicker.io/api/file/IvzcfvBSSY2iJQ4OqKdP',
    filename: 'denis',
    event: 'event-1',
    thumbnail: 'thumbnail-2'
}, {
    id: 'picture-8',
    url: 'https://www.filepicker.io/api/file/IvzcfvBSSY2iJQ4OqKdP',
    filename: 'denis',
    event: 'event-1',
    thumbnail: 'thumbnail-2'
}, {
    id: 'picture-9',
    url: 'https://www.filepicker.io/api/file/lhDg6lzvQRuLJe2iUqUN',
    filename: 'denis',
    event: 'event-1',
    thumbnail: 'thumbnail-1'
}]

App.Thumbnail.FIXTURES = [{
    id: 'thumbnail-1',
    url: 'https://www.filepicker.io/api/file/lhDg6lzvQRuLJe2iUqUN',
    filename: 'avatar.png',
    picture: 'picture-1'
}, {
    id: 'thumbnail-2',
    url: 'https://www.filepicker.io/api/file/8AYb3KcSaWnjaN1ybd5h',
    filename: 'denis',
    picture: 'picture-2'
}]

App.Comment.FIXTURES = [{
    id: 'comment-1',
    event: 'event-1',
    author: 'user-1',
    creationTime: moment(new Date()),
    message: 'Cool story, bro!'
}, {
    id: 'comment-2',
    event: 'event-1',
    author: 'user-3',
    creationTime: moment(new Date()),
    message: 'I\'ve got a new haircut.'
}, {
    id: 'comment-3',
    event: 'event-1',
    author: 'user-2',
    creationTime: moment(new Date()),
    message: 'Why are you so happy?'
}]
;var DateFormats = {
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
;DATE_FORMAT = 'YYYY-MM-DD H:m:s'

App.MomentTransform = DS.Transform.extend({
    deserialize: function(serialized) {
        return serialized ? moment(serialized, DATE_FORMAT) : undefined
    },
    serialize: function(deserialized) {
        return deserialized ? deserialized.format(DATE_FORMAT) : ''
    }
});

App.LocationTransform = DS.Transform.extend({
    deserialize: function(serialized) {
        return serialized ? Ember.Object.create({
            address: serialized.address,
            geopoint: Ember.Object.create({
                latitude: serialized.geopoint ? serialized.geopoint[0] : null,
                longitude: serialized.geopoint ? serialized.geopoint[1] : null
            })
        }) : null
    },
    serialize: function(deserialized) {
        result = deserialized ? {
            address: deserialized.get('address')
        } : null
        if (result && deserialized.get('geopoint.latitude') && deserialized.get('geopoint.longitude')) {
            result.geopoint = [
                deserialized.get('geopoint.latitude'), deserialized.get('geopoint.longitude')
            ]
        }
        return result
    }
});

App.Event = DS.Model.extend({
    title: DS.attr('string'),
    startDate: DS.attr('moment'),
    endDate: DS.attr('moment'),
    description: DS.attr('string'),
    public: DS.attr('boolean'),
    creator: DS.belongsTo('user'),
    location: DS.attr('location'),
    participants: DS.hasMany('invitation', {
        inverse: 'event',
        async: true,
        embedded: 'always'
    }),
    cover: DS.belongsTo('picture'),
    pictures: DS.hasMany('picture', {
        inverse: 'event',
        async: true
    }),
    comments: DS.hasMany('comment', {
        inverse: 'event',
        async: true
    }),
    sortedComments: function() {
        var comments = this.get('comments').toArray();
        return comments.sort(function(lhs, rhs) {
            return lhs.get('creationTime').unix() < rhs.get('creationTime').unix()
        });
    }.property('comments.@each.isLoaded')
})

App.Invitation = DS.Model.extend({
    link: DS.attr('string'),
    acceptanceStatus: DS.attr('string', {
        default: 'pending'
    }),
    user: DS.belongsTo('user', {
        inverse: 'invitedTo'
    }),
    event: DS.belongsTo('event', {
        inverse: 'participants'
    })
})

App.User = DS.Model.extend({
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    fullName: function() {
        return (this.get('firstName') || '') + ' ' + (this.get('lastName') || '');
    }.property('firstName', 'lastName'),
    email: DS.attr('string'),
    ownEvents: DS.hasMany('event', {
        inverse: 'creator'
    }),
    invitedTo: DS.hasMany('invitation', {
        inverse: 'user'
    }),
    gravatar: function() {
        return getGravatar(this.get('email'), 40)
    }.property('email')
})

App.Picture = DS.Model.extend({
    event: DS.belongsTo('event', {
        inverse: 'pictures'
    }),
    url: DS.attr('string'),
    filename: DS.attr('string'),
    thumbnail: DS.belongsTo('thumbnail', {
        inverse: 'picture'
    }),
    isCover: function() {
        return (this.get('event.cover') === this)
    }.property('event.cover'),
    thumbnailUrl: function() {
        return this.get('thumbnail') ? this.get('thumbnail.url') : this.get('url')
    }.property('thumbnail.url', 'url')
})

App.Thumbnail = DS.Model.extend({
    url: DS.attr('string'),
    filename: DS.attr('string'),
    picture: DS.belongsTo('picture', {
        inverse: 'thumbnail'
    })
})

App.Comment = DS.Model.extend({
    event: DS.belongsTo('event', {
        inverse: 'comments'
    }),
    creationTime: DS.attr('moment'),
    author: DS.belongsTo('user'),
    message: DS.attr('string')
})
;var guid = (function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
})();

var md5 = (function() {
    function e(e, t) {
        var o = e[0],
            u = e[1],
            a = e[2],
            f = e[3];
        o = n(o, u, a, f, t[0], 7, -680876936);
        f = n(f, o, u, a, t[1],
            12, -389564586);
        a = n(a, f, o, u, t[2], 17, 606105819);
        u = n(u, a, f, o, t[3], 22, -1044525330);
        o = n(o, u, a, f, t[4], 7, -176418897);
        f = n(f, o, u, a, t[5],
            12, 1200080426);
        a = n(a, f, o, u, t[6], 17, -1473231341);
        u = n(u, a, f, o, t[7], 22, -45705983);
        o = n(o, u, a, f, t[8], 7, 1770035416);
        f = n(f, o, u, a, t[9],
            12, -1958414417);
        a = n(a, f, o, u, t[10], 17, -42063);
        u = n(u, a, f, o, t[11], 22, -1990404162);
        o = n(o, u, a, f, t[12], 7, 1804603682);
        f = n(f, o, u, a, t[13],
            12, -40341101);
        a = n(a, f, o, u, t[14], 17, -1502002290);
        u = n(u, a, f, o, t[15], 22, 1236535329);
        o = r(o, u, a, f, t[1], 5, -165796510);
        f = r(f, o, u, a, t[6],
            9, -1069501632);
        a = r(a, f, o, u, t[11], 14, 643717713);
        u = r(u, a, f, o, t[0], 20, -373897302);
        o = r(o, u, a, f, t[5], 5, -701558691);
        f = r(f, o, u, a, t[10],
            9, 38016083);
        a = r(a, f, o, u, t[15], 14, -660478335);
        u = r(u, a, f, o, t[4], 20, -405537848);
        o = r(o, u, a, f, t[9], 5, 568446438);
        f = r(f, o, u, a, t[14],
            9, -1019803690);
        a = r(a, f, o, u, t[3], 14, -187363961);
        u = r(u, a, f, o, t[8], 20, 1163531501);
        o = r(o, u, a, f, t[13], 5, -1444681467);
        f = r(f, o, u, a, t[2],
            9, -51403784);
        a = r(a, f, o, u, t[7], 14, 1735328473);
        u = r(u, a, f, o, t[12], 20, -1926607734);
        o = i(o, u, a, f, t[5], 4, -378558);
        f = i(f, o, u, a, t[8],
            11, -2022574463);
        a = i(a, f, o, u, t[11], 16, 1839030562);
        u = i(u, a, f, o, t[14], 23, -35309556);
        o = i(o, u, a, f, t[1], 4, -1530992060);
        f = i(f, o, u, a, t[4],
            11, 1272893353);
        a = i(a, f, o, u, t[7], 16, -155497632);
        u = i(u, a, f, o, t[10], 23, -1094730640);
        o = i(o, u, a, f, t[13], 4, 681279174);
        f = i(f, o, u, a, t[0],
            11, -358537222);
        a = i(a, f, o, u, t[3], 16, -722521979);
        u = i(u, a, f, o, t[6], 23, 76029189);
        o = i(o, u, a, f, t[9], 4, -640364487);
        f = i(f, o, u, a, t[12],
            11, -421815835);
        a = i(a, f, o, u, t[15], 16, 530742520);
        u = i(u, a, f, o, t[2], 23, -995338651);
        o = s(o, u, a, f, t[0], 6, -198630844);
        f = s(f, o, u, a, t[7],
            10, 1126891415);
        a = s(a, f, o, u, t[14], 15, -1416354905);
        u = s(u, a, f, o, t[5], 21, -57434055);
        o = s(o, u, a, f, t[12], 6, 1700485571);
        f = s(f, o, u, a, t[3],
            10, -1894986606);
        a = s(a, f, o, u, t[10], 15, -1051523);
        u = s(u, a, f, o, t[1], 21, -2054922799);
        o = s(o, u, a, f, t[8], 6, 1873313359);
        f = s(f, o, u, a, t[15],
            10, -30611744);
        a = s(a, f, o, u, t[6], 15, -1560198380);
        u = s(u, a, f, o, t[13], 21, 1309151649);
        o = s(o, u, a, f, t[4], 6, -145523070);
        f = s(f, o, u, a, t[11],
            10, -1120210379);
        a = s(a, f, o, u, t[2], 15, 718787259);
        u = s(u, a, f, o, t[9], 21, -343485551);
        e[0] = m(o, e[0]);
        e[1] = m(u, e[1]);
        e[2] = m(a, e[2]);
        e[3] = m(f, e[3])
    }

    function t(e, t, n, r, i, s) {
        t = m(m(t, e), m(r, s));
        return m(t << i | t >>> 32 - i, n)
    }

    function n(e, n, r, i, s, o, u) {
        return t(n & r | ~n & i, e, n, s, o, u)
    }

    function r(e, n, r, i, s, o, u) {
        return t(n & i | r & ~i, e, n, s, o, u)
    }

    function i(e, n, r, i, s, o, u) {
        return t(n ^ r ^ i, e, n, s, o, u)
    }

    function s(e, n, r, i, s, o, u) {
        return t(r ^ (n | ~i), e, n, s, o, u)
    }

    function o(t) {
        var n = t.length,
            r = [1732584193, -271733879, -1732584194, 271733878],
            i;
        for (i = 64; i <= t.length; i += 64) {
            e(r, u(t.substring(i - 64, i)))
        }
        t = t.substring(i - 64);
        var s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < t.length; i++) s[i >> 2] |= t.charCodeAt(i) << (i % 4 << 3);
        s[i >> 2] |= 128 << (i % 4 << 3);
        if (i > 55) {
            e(r, s);
            for (i = 0; i < 16; i++) s[i] = 0
        }
        s[14] = n * 8;
        e(r, s);
        return r
    }

    function u(e) {
        var t = [],
            n;
        for (n = 0; n < 64; n += 4) {
            t[n >> 2] = e.charCodeAt(n) + (e.charCodeAt(n + 1) << 8) + (e.charCodeAt(n + 2) << 16) + (e.charCodeAt(n + 3) << 24)
        }
        return t
    }

    function c(e) {
        var t = "",
            n = 0;
        for (; n < 4; n++) t += a[e >> n * 8 + 4 & 15] + a[e >> n * 8 & 15];
        return t
    }

    function h(e) {
        for (var t = 0; t < e.length; t++) e[t] = c(e[t]);
        return e.join("")
    }

    function d(e) {
        return h(o(unescape(encodeURIComponent(e))))
    }

    function m(e, t) {
        return e + t & 4294967295
    }
    var a = "0123456789abcdef".split("");
    return d
})();

function getGravatar(email, size) {

    var size = size || 80;

    return 'http://www.gravatar.com/avatar/' + md5(email) + '.jpg?s=' + size;
}
;App.EventsWizardView = Ember.View.extend({
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
