const router = require('express').Router();
const passport = require('passport');

const { articleController } = require('./../controllers');

router
    .get('/all', articleController.getAll)
    .get('/get/:articleId', articleController.getById)
    .post('/create', passport.authenticate('jwt'), articleController.create)
    .put('/edit', passport.authenticate('jwt'), articleController.edit)
    .delete('/delete/:articleId', passport.authenticate('jwt'), articleController.delete);

module.exports = router;
