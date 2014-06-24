var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
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
