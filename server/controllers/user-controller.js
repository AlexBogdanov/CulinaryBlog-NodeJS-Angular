const { userData } = require('./../data');
const cloneOnly = require('./../utilities/clone-only');

const validProperties = [
    'username', 'fistName', 'lastName',
    'email', 'profilePic'
];

const userController = {
    register: (req, res) => {
        const user = cloneOnly(req.body, ['username', 'password', 'email', 'firstName', 'lastName']);

        userData.register(user.username, user.password, user.email, user.firstName, user.lastName)
            .then(data => {
                res.success(data);
            })
            .catch(err => {
                res.error(err.message);
            });
    },

    login: (req, res) => {
        const user = cloneOnly(req.body, ['username', 'password']);

        userData.login(user.username, user.password)
            .then(res.success)
            .catch(err => {
                res.error(err.message);
            });
    },

    getUserById: (req, res) => {
        userData.getUserById(req.params.id)
          .then(user => {
              user.articles = user.articles.map(article => {
                article.shortDescr = article.description.substring(0, 50);
                return article;
              });

              user.recipes = user.recipes.map(recipe => {
                recipe.shortDescr = recipe.preparation.substring(0, 50);
                return recipe;
              });

              res.success(user);
          })
          .catch(err => {
            res.error(err.message);
          });
    },

    updateUser: (req, res) => {
        const user = cloneOnly(req.body, validProperties);

        userData.updateUser(req.user._id, user)
          .then(res.success)
          .catch(err => {
              res.error(err.message);
          });
    }
};

module.exports = userController;
