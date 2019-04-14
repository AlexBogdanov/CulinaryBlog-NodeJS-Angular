const notifMsgs = {
    errors: {
        REGISTER_FAILED: 'Failed to register new user.',
        USERNAME_TAKEN: 'Username already taken.',
        LOGIN_FAILED: 'Login failed.',
        INVALID_USERNAME: 'User with this name does not exist.',
        INVALID_PASSWORD: 'Invalid password.',
        COULD_NOT_GET_ARTICLES: 'Unable to get articles, please try again.',
        COULD_NOT_GET_ARTICLE: 'Unable to get article, please try again.',
        COULD_NOT_CREATE_ARTICLE: 'Unable to create article, please try again.',
        COULD_NOT_UPDATE_ARTICLE: 'Unable to update article, please try again.',
        COULD_NOT_DELETE_ARTICLE: 'Unable to delete article, please try again.',
        COULD_NOT_GET_RECIPES: 'Unable to get recipes, please try again.',
        COULD_NOT_GET_RECIPE: 'Unable to get recipe, please try again.',
        COULD_NOT_CREATE_RECIPE: 'Unable to create recipe, please try again.',
        COULD_NOT_UPDATE_RECIPE: 'Unable to update recipe, please try again.',
        COULD_NOT_DELETE_RECIPE: 'Unable to delete recipe, please try again.'
    },

    success: {
        SUCCESSFULL_REGISTER: 'User registrated successfully.',
        SUCCESSFULL_LOGIN: 'Login successfull.',
        ARTICLE_CREATED: 'Article created successfully.',
        ARTICLE_UPDATED: 'Article updated successfully.',
        ARTICLE_DELETED: 'Article deleted successfully.',
        RECIPE_CREATED: 'Recipe created successfully.',
        RECIPE_UPDATED: 'Recipe updated successfully.',
        RECIPE_DELETED: 'Recipe deleted successfully.'
    }
};

module.exports = notifMsgs;
