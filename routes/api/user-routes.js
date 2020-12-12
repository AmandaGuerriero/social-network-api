const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');
  

// GET all Users and POST a new User at /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// GET one User, PUT one user, and DELETE one user at /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// POST & DELETE of friends at /api/users/:id/friends/:friendId
router.route('/:id/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;