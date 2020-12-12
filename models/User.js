const { Schema, model } = require('mongoose');

// User Schema
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
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [ {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
    },
        id: false
    }
);

// Friend Count
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
