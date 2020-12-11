var validator = require('validator');
const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function(email) {
                    var emailAddress = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    return emailAddress.test(email)
                },
                message: "You must provide a valid email address."
              }
            
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [ this ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
    },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
  return this.friends.reduce(
    (total, friend) => total + friend.replies.length + 1,
    0
  );
});

const User = model('User', UserSchema);

module.exports = User;
