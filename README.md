# fin

This is the repository for my final proj in WDI.

It is pretty basic, it is a RESTful backend server serving json objects to the client at fin-vue.

It implements basic CRUD actions but it also integrates JSON Web Tokens for its authentication.

Also, the ORM being used is Sequelize.js which is not one of the ORMs taught through the course.

## Getting Started

create a .env file with a key value pair SECRET=somesecret
npm install and node app.js

server should start on http://localhost:8080

### How to Use

so for this basic application, there are 11 api end points available. Of which 2 are unprotected; the rest are protected by JSON web tokens, which are supplied when the user logs in.

So the list of routes and its corresponding controllers are:

```
//unprotected
router.post('/register') usersController#create
router.post('/login') usersController#auth

//protected
router.put('/:userId') usersController#update
router.delete('/:userId') usersController#destroy
router.post('/:userId/books') booksController#create
router.put('/books/:bookId') booksController#update
router.get('/:userId/books') booksController#list
router.get('/books/:bookId') booksController#show
router.delete('/books/:bookId') booksController#destroy
```

## Tests

yes test were written but they were written after writing the code(bad practice i know), they cover all api end points and most model validations

so in order to run the tests:
```
npm run test
```

## Live Version

The api backend is hosted on this website:

## Built With

What did you use to build it, list the technologies, plugins, gems, packages etc.

* cors
* sequelize
* jsonwebtoken

## Workflow

Workflow was super disorganised.

Abandoned a previous project due to myself falling sick and getting frustrated with sequelize hasMany and BelongsToMany through something.

So reduced the scope by a huge amount, just 2 models. But the SPA/ RESTful architecture remains largely intact.

## Authors

Did you collaborate with others on this project, list them here

* **Just me**

## Acknowledgments

* Nil
