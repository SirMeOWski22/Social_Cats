const { User, Thought } = require('../models');

const userController = {
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  //single user by id
  getUserById(req, res) {
    User.findById(req.params.id)
      .populate('thoughts')
      .populate('friends')
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  //create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((newUser) => res.json(newUser))
      .catch((err) => res.status(500).json(err));
  },

  //update a user
  updateUser(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((updatedUser) => res.json(updatedUser))
      .catch((err) => res.status(500).json(err));
  },

  //remove a user by id
  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json({ message: 'User deleted' }))
      .catch((err) => res.status(500).json(err));
  },

  //add a friend
  addFriend(req, res) {
    User.findById(req.params.userId)
      .then((user) => {
        user.friends.push(req.params.friendId);
        return user.save();
      })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  //remove a friend
  removeFriend(req, res) {
    User.findById(req.params.userId)
      .then((user) => {
        user.friends.pull(req.params.friendId);
        return user.save();
      })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;
