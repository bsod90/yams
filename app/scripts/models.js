DATE_FORMAT = 'YYYY-MM-DD H:m:s'

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
