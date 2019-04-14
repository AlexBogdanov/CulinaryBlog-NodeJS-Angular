const Recipe = require('./../models/Recipe');
const notifMsgs = require('./../constants/notification-messages');

const recipeData = {
    getAll: () => new Promise((res, rej) => {
        Recipe.find((err, recipes) => {
            if (err) {
                console.log(err);
                return rej(new Error(notifMsgs.errors.COULD_NOT_GET_RECIPES));
            }

            return res(recipes);
        });
    }),

    getById: (id) => new Promise((res, rej) => {
        Recipe.findById(id, (err, recipe) => {
            if (err) {
                console.log(err);
                return rej(new Error(notifMsgs.errors.COULD_NOT_GET_RECIPE));
            }

            return res(recipe);
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
                return rej(new Error(notifMsgs.errors.COULD_NOT_DELETE_RECIPE));
            }

            return res({ msg: notifMsgs.success.RECIPE_DELETED });
        });
    })
};

module.exports = recipeData;
