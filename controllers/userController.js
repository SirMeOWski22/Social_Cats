const { User } = require('../models');

// Controller functions for user routes
const userController = {
  // GET all users
  getAllUsers(req, res) {
    console.log('getAllUsers called');
    User.find()
      .then((users) => {
        console.log('Users retrieved:', users);
        res.json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // GET a single user by _id
  getUserById(req, res) {
    console.log('getUserById called with id:', req.params.id);
    User.findById(req.params.id)
      .populate('thoughts')
      .populate('friends')
      .then((user) => {
        console.log('User retrieved:', user);
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // POST a new user
  createUser(req, res) {
    console.log('createUser called with body:', req.body);
    User.create(req.body)
      .then((newUser) => {
        console.log('New user created:', newUser);
        res.json(newUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // PUT to update a user by _id
  updateUser(req, res) {
    console.log('updateUser called with id:', req.params.id, 'body:', req.body);
    User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        console.log('User updated:', updatedUser);
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // DELETE to remove user by _id
  deleteUser(req, res) {
    console.log('deleteUser called with id:', req.params.id);
    User.findByIdAndDelete(req.params.id)
      .then(() => {
        console.log('User deleted');
        res.json({ message: 'User deleted' });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // POST to add a friend to user's friend list
  addFriend(req, res) {
    console.log(
      'addFriend called with userId:',
      req.params.userId,
      'friendId:',
      req.params.friendId
    );
    User.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        user.friends.push(req.params.friendId);
        return user.save();
      })
      .then((user) => {
        console.log('Friend added:', user);
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // DELETE to remove a friend from user's friend list
  removeFriend(req, res) {
    console.log(
      'removeFriend called with userId:',
      req.params.userId,
      'friendId:',
      req.params.friendId
    );
    User.findById(req.params.userId)
      .then((user) => {
        user.friends.pull(req.params.friendId);
        return user.save();
      })
      .then((user) => {
        console.log('Friend removed:', user);
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;
