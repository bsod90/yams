App.EventController = Ember.ObjectController.extend(App.EventBackgroundMixin, {
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
