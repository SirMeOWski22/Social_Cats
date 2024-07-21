const { Thought, User } = require('../models');

// Controller functions for thought routes
const thoughtController = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // GET a single thought by _id
  getThoughtById(req, res) {
    Thought.findById(req.params.id)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // POST to create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((newThought) => {
        return User.findByIdAndUpdate(
          req.body.userId,
          { $push: { thoughts: newThought._id } },
          { new: true }
        );
      })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // PUT to update a thought by _id
  updateThought(req, res) {
    Thought.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((updatedThought) => res.json(updatedThought))
      .catch((err) => res.status(500).json(err));
  },
  // DELETE to remove a thought by _id
  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.id)
      .then(() => res.json({ message: 'Thought deleted' }))
      .catch((err) => res.status(500).json(err));
  },
  // POST to create a reaction stored in a single thought's reactions array field
  createReaction(req, res) {
    Thought.findById(req.params.thoughtId)
      .then((thought) => {
        thought.reactions.push(req.body);
        return thought.save();
      })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // DELETE to pull and remove a reaction by the reaction's reactionId value
  deleteReaction(req, res) {
    Thought.findById(req.params.thoughtId)
      .then((thought) => {
        thought.reactions.id(req.params.reactionId).remove();
        return thought.save();
      })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
