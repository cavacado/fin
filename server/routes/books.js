const booksController = require('../controllers/books');
const express = require('express');
const router = express.Router();

router.post('/:userId/books', booksController.create);
router.put('/books/:bookId', booksController.update);
router.get('/:userId/books', booksController.list);
router.get('/books/:bookId', booksController.show);
router.delete('/books/:bookId', booksController.destroy);

module.exports = router;
