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
            required: true
            // Valid email address
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

UserSchema.virtual('thoughtCount').get(function() {
  return this.thougths.reduce(
    (total, thought) => total + thought.replies.length + 1,
    0
  );
});

const User = model('User', UserSchema);

module.exports = User;
