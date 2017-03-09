const usersController = require('../controllers/users');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.status(200).send({ msg: 'root for users page' }));
router.post('/register', usersController.create);
router.post('/login', usersController.auth);
router.put('/:userId', usersController.update);
router.delete('/:userId', usersController.destroy);

module.exports = router;
