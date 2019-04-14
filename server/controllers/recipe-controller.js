const { recipeData } = require('./../data');
const cloneOnly = require('./../utilities/clone-only');

const validProperties = [
    'name',
    'preparation',
    'products',
    'author',
    'likes'
];

const recipeController = {
    getAll: (req, res) => {
        recipeData.getAll()
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    getById: (req, res) => {
        recipeData.getById(req.params.recipeId)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    create: (req, res) => {
        const recipe = cloneOnly(req.body, validProperties);

        recipeData.create(recipe)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    edit: (req, res) => {
        const recipe = cloneOnly(req.body, validProperties);

        recipeData.edit(req.body.recipeId, recipe)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    delete: (req, res) => {
        recipeData.delete(req.params.recipeId)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    }
};

module.exports = recipeController;
