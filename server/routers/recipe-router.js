const router = require('express').Router();
const passport = require('passport');

const { recipeController } = require('./../controllers');

router
    .get('/all', recipeController.getAll)
    .get('/get/:recipeId', recipeController.getById)
    .post('/create', passport.authenticate('jwt'), recipeController.create)
    .put('/edit', passport.authenticate('jwt'), recipeController.edit)
    .delete('/delete/:recipeId', passport.authenticate('jwt'), recipeController.delete);

module.exports = router;
