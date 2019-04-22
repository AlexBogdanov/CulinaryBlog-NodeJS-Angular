const { recipeData } = require('./../data');
const cloneOnly = require('./../utilities/clone-only');

const validProperties = [
    'name',
    'preparation',
    'products',
    'author',
    'img'
];

const recipeController = {
    getAll: (req, res) => {
        recipeData.getAll()
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message);
          });
    },

    getById: (req, res) => {
        recipeData.getById(req.params.recipeId)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message);
          });
    },

    create: (req, res) => {
        const recipe = cloneOnly(req.body, validProperties);

        recipeData.create(recipe)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message);
          });
    },

    edit: (req, res) => {
        const recipe = cloneOnly(req.body.recipe, validProperties);

        recipeData.edit(req.body.recipeId, recipe)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message);
          });
    },

    delete: (req, res) => {
        recipeData.delete(req.params.recipeId)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message);
          });
    },

    getUserRecipes: (req, res) => {
      recipeData.getRecipesByUserId(req.user._id)
        .then(res.success)
        .catch(err => {
          console.log(err);
          res.error(err.message);
        });
    }
};

module.exports = recipeController;
