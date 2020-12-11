const router = require('express').Router();
const { addThought, addReaction, removeReaction, getAllThoughts, getThoughtById, updateThought, deleteThought } = require('../../controllers/thought-controller');

// Set up GET all and POST at api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(addThought);

// Set up GET one, PUT one and DELETE one thought at api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction);

// router
//   .route('/:userId/:thoughtId')
//   .put(addReaction)
//   .delete(removeThought)

// router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;