const { Thought, User } = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //singe though by id
  getThought(req, res) {
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

  //update a thought by id
  updateThought(req, res) {
    Thought.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((updatedThought) => res.json(updatedThought))
      .catch((err) => res.status(500).json(err));
  },

  //remove a thought by id
  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.id)
      .then(() => res.json({ message: 'Thought deleted' }))
      .catch((err) => res.status(500).json(err));
  },

  createReaction(req, res) {
    Thought.findById(req.params.thoughtId)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

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
