const Recipe = require('./../models/Recipe');
const notifMsgs = require('./../constants/notification-messages');

const recipeData = {
    getAll: () => new Promise((res, rej) => {
        Recipe.find((err, recipes) => {
            if (err) {
                console.log(err);
                rej(new Error(notifMsgs.errors.COULD_NOT_GET_RECIPES));
            }

            res(recipes);
        });
    }),

    getById: (id) => new Promise((res, rej) => {
        Recipe.findById(id)
        .populate('author', '_id firstName lastName')
        .exec((err, recipe) => {
            if (err) {
                console.log(err);
                rej(new Error(notifMsgs.errors.COULD_NOT_GET_RECIPE));
            }

            res(recipe);
        });
    }),

    create: async (recipeInput) => {
        try {
            const recipe = await Recipe.create(recipeInput);
            
            if (recipe.products.length < 2) {
                throw new Error();
            }

            return { recipe, msg: notifMsgs.success.RECIPE_CREATED };
        } catch (err) {
            console.log(err);
            throw new Error(notifMsgs.errors.COULD_NOT_CREATE_RECIPE);
        }
    },

    edit: async (id, newRecipe) => {
        try {
            const recipe = await Recipe.findById(id);

            for (const [key, value] of Object.entries(newRecipe)) {
                recipe[key] = value;
            }
            
            if (recipe.products.length < 2) {
                throw new Error();
            }

            await recipe.save();
            return { recipe, msg: notifMsgs.success.RECIPE_UPDATED };
        } catch (err) {
            console.log(err);
            throw new Error(notifMsgs.errors.COULD_NOT_UPDATE_RECIPE);
        }
    },

    delete: (id) => new Promise((res, rej) => {
        Recipe.findByIdAndDelete(id, (err) => {
            if (err) {
                console.log(err);
                rej(new Error(notifMsgs.errors.COULD_NOT_DELETE_RECIPE));
            }

            res({ msg: notifMsgs.success.RECIPE_DELETED });
        });
    }),

    getRecipesByUserId: (userId) => new Promise((res, rej) => {
        Recipe.find({ author: userId }, (err, recipes) => {
            if (err) {
                console.log(err);
                rej(new Error(notifMsgs.errors.COULD_NOT_GET_RECIPES));
            }

            res(recipes);
        });
    }),

    searchRecipes: (searchStr) => new Promise((res, rej) => {
        Recipe.find({ name: { $regex: '^' + searchStr } })
        .select('_id name')
        .exec((err, recipes) => {
            if (err) {
                console.log(err);
                rej(new Error(notifMsgs.errors.COULD_NOT_GET_RECIPES));
            }

            res(recipes);
        });
    })
};

module.exports = recipeData;
