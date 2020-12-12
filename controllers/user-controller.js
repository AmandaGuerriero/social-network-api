const { User, Thought } = require('../models');

const userController = {
  // Get All Users
  getAllUsers(req, res) {
    User.find({})
      .populate({
          path: 'thoughts',
          select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          console.log(err);
          res.sendStatus(400);
      });
  },

  // Get a single User by ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
          path: 'thoughts',
          select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          console.log(err);
          res.sendStatus(400);
      });
  },

  // Create a User
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // Update User by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }
      res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // Delete a User
  deleteUser({ params, body }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No User found with this id!' });
        }
        return Thought.deleteMany({_id: {$in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: 'User and their thoughts deleted'});
      })
      .catch((err) => {
        res.status(500).json(err);
      })
  },

  // Add a Friend
  addFriend({params, body}, res) {
    User.findOneAndUpdate({_id: params.id}, { $addToSet: { friends: params.friendId}}, {new: true})
      .then((dbUserData) => {
        if (!dbUserData) {
            return res.status(404).json({ message: 'No User found with this id!'});
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        res.status(500).json(err)
      });
  },
  
  // Remove a Friend
  removeFriend({params, body}, res) {
    User.findOneAndUpdate(
      {_id: params.id}, 
      { $pull: { friends: params.friendId}}, 
      {new: true})
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: 'No User found with this id!'});
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      res.status(500).json(err)
    });
  }          
};

module.exports = userController;
