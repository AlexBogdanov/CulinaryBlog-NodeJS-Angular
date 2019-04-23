const router = require('express').Router();
const passport = require('passport');

const { userController } = require('./../controllers');

router
    .post('/register', userController.register)
    .post('/login', passport.authenticate('local'), userController.login)
    .get('/user/:id', passport.authenticate('jwt'), userController.getUserById)
    .put('/update', passport.authenticate('jwt'), userController.updateUser);

module.exports = router;
