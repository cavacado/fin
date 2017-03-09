const User = require('../models').User;
const jwt = require('jsonwebtoken');

module.exports = {
  create(req, res) {
    return User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }).then(user => res.status(200).send({ msg: 'user created successfully' }))
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  update(req, res) {
    return User.findById(req.params.userId).then(user => {
      if (!user) return res.status(404).send({ msg: 'user not found'});
      return user.update({
        name: req.body.name || user.name,
        email: req.body.email || user.email,
        password: req.body.password || user.password,
      }).then(() => res.status(200).send(user))
        .catch(error => res.status(400).send(error));
    })
  },

  destroy(req, res) {
    return User.findById(req.params.userId).then(user => {
      if (!user) return res.status(404).send({ msg: 'user not found' });
      return user.destroy().then(() => res.status(200).send({ msg: 'user deleted successfully' }))
        .catch(error => res.status(400).send(error));
    }).catch(error => res.status(400).send(error));
  },

  auth(req,res) {
    return User.find({where: {email: req.body.email}}).then(user => {
      if (!user) { return res.status(400).send({ msg: 'user not found'})};
      return user.authenticated(req.body.password, function(err,result) {
        if (err || !result) return res.send({ msg: 'user not authenticated'});
        let token = jwt.sign({ user: user.id }, process.env.SECRET);
        res.send({'userId': user.id, 'username': user.name, 'token': token, msg: 'successfully logged in'});
      })
    })
  }
}
