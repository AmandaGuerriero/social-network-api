const { Thought, User } = require('../models');

const thoughtController = {
  // Get All Thoughts
  getAllThoughts(req, res) {
    Thought.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
  
  // Get a single Thought by ID
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
        .populate({
            path: 'users',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
  },

  // Add a Thought
  addThought({ body }, res) {
    Thought.create(body)
        .then(dbThoughtData => {
          return User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: dbThoughtData._id} },
            { new: true}
          );
        })
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: 'Thought created but no user associated' });
          }
          res.json({ message: 'Your thought was created'});
        })
        .catch(err => res.json(err));
  },

   // Update Thought By ID
   updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No Thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

  // Delete Thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOneAndUpdate(
          { thoughts: params.id },
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found for this thought!' });
          return;
        }
        res.json( { message: 'Thought deleted successfully!'});
      })
      .catch(err => res.json(err));
  },

  // Add Reaction to Thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // Remove a Reaction from a Thought
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
  }
};

module.exports = thoughtController;
