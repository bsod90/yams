App.EventsWizardController = Ember.ObjectController.extend(App.EventBackgroundMixin, {
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
