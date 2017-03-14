require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const colors = require('colors');
const expressJWT = require('express-jwt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 8080;
const userRoutes = require('./server/routes/users');
const bookRoutes = require('./server/routes/books');
const secret = process.env.SECRET || 'superduperlongassssnnoooogsfdfsecret'

const app = express();

app.set('port', PORT);
app.set('json spaces', 4);

function customMiddleware(req,res,next){
  console.log('------------------------------------------------------------------------------------------'.rainbow);
  //proceeding on towards the next middleware
  next();
}
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(customMiddleware);


app.use('/', expressJWT({ secret: secret}).unless({ method: 'POST'}), userRoutes);
app.use('/', expressJWT({ secret: secret}), bookRoutes);
app.use((err,req,res,next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ msg: 'You need an authorization token to view this information!'})
  }
})

// app.use('/', userRoutes);
// app.use('/', bookRoutes);
app.get('*', (req,res) => res.status(200).send({
  msg: 'catch-all route',
}))

app.listen(PORT, () => console.log(`server is listenting on port ${PORT}`.magenta))

module.exports = app;
