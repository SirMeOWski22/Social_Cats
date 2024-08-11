const { Thought, User } = require('../models');
const { stringify } = require('flatted');

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
        if (!thought) {
          console.log('No thought found with this id:', req.params.thoughtId);
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        const reaction = thought.reactions.id(req.params.reactionId);
        if (!reaction) {
          console.log('No reaction found with this id:', req.params.reactionId);
          return res.status(404).json({ message: 'No reaction found with this id!' });
        }
        reaction.remove();
        return thought.save();
      })
      .then((updatedThought) => {
        if (!updatedThought) {
          return;
        }
        console.log('Reaction deleted successfully');
        res.json({ message: 'Reaction deleted successfully', updatedThought });
      })
      .catch((err) => {
        console.error('Error while deleting reaction:', err.message || err);
        if (!res.headersSent) {
          res.status(500).json({ error: err.message || 'An error occurred' });
        }
      });
  },
};

module.exports = thoughtController;
