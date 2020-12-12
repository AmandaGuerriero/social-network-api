const router = require('express').Router();

const { 
  addThought, 
  addReaction, 
  removeReaction, 
  getAllThoughts, 
  getThoughtById, 
  updateThought, 
  deleteThought 
} = require('../../controllers/thought-controller');

// GET all thoughts and POST a thought at api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(addThought);

// GET one thought, PUT one thought and DELETE one thought at api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// POST a reaction to a thought at api/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction)

// DELETE a reaction to a Thought at api/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;