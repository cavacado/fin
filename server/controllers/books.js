const Book = require('../models').Book;
const User = require('../models').User;

// if you're getting some weird error in the front end ie not getting data from the db; rmb to save the token body into local storage to go to the diff routes!!!!
module.exports = {
  create(req, res) {
    return Book.create({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      read: req.body.read,
      userId: req.params.userId,
    }).then(book => res.status(200).send(book))
      .catch(book => res.status(400).send(error));
  },

  list(req, res) {
    return Book.findAll({
      where: { userId: req.params.userId },
      order: '"id" ASC',
    }).then(books => res.status(200).send(books))
      .catch(error => res.status(400).send(error));
  },

  show(req, res) {
    return Book.findById(req.params.bookId).then(book => res.status(200).send(book))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Book.findById(req.params.bookId).then(book => {
      if (!book) return res.status(404).send({ msg: 'book not found'});
      return book.update({
        title: req.body.title || book.title,
        author: req.body.author || book.author,
        description: req.body.description || book.description,
        read: req.body.read
      }).then(() => res.status(200).send(book))
        .catch(error => res.status(400).send(error));
    })
  },

  destroy(req, res) {
    return Book.findById(req.params.bookId).then(book => {
      if (!book) return res.status(404).send({ msg: 'book not found'});
      return book.destroy().then(() => res.status(200).send({ msg: 'book successfully deleted' }))
        .catch(error => res.status(400).send(error));
    }).catch(error => res.status(400).send(error));
  }
}
