const { userData, articleData, recipeData } = require('./../data');
const cloneOnly = require('./../utilities/clone-only');
const { dataTypes } = require('./../constants/common');

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
          .then(res.success)
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
    },

    search: async (req, res) => {
        const searchStr = req.query.search;

        try {
            const users = await userData.searchUsers(searchStr);
            const articles = await articleData.searchArticles(searchStr);
            const recipes = await recipeData.searchRecipes(searchStr);

            const mappedUsers = users.map(user => {
                user.type = dataTypes.USER;
                return user;
            });

            const mappedArticles = articles.map(article => {
                article.type = dataTypes.ARTICLE;
                return article;
            });

            const mappedRecipes = recipes.map(recipe => {
                recipe.type = dataTypes.RECIPE;
                return recipe;
            });

            const result = [...mappedUsers, ...mappedArticles, ...mappedRecipes];
            res.success(result);
        } catch (err) {
            res.error(err.message);
        }
    }
};

module.exports = userController;
