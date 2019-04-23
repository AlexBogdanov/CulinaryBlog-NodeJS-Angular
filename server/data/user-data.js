const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('./../models/User');
const notifMsgs = require('./../constants/notification-messages');
const { secret } = require('./../config/config');

const BCRYPT_SALT_ROUNDS = 12;

const userData = {
    register: async (username, password, email, firstName, lastName ) => {
        try {
            const userDB = await User.findOne({ username });

            if (userDB) {
                throw new Error(notifMsgs.errors.USERNAME_TAKEN);
            }

            const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
            const hashedPass = await bcrypt.hash(password, salt);
            const user = {
                username,
                password: hashedPass,
                email,
                firstName,
                lastName,
                salt,
                roles: ['User']
            };
            const createdUser = await User.create(user);

            return { user: createdUser, msg: notifMsgs.success.SUCCESSFULL_REGISTER };
        } catch (err) {
            console.log(err);
            throw new Error(notifMsgs.errors.REGISTER_FAILED);
        }
    },

    login: async (username, password) => {
        try {
            const user = await User.findOne({ username });

            if (!user) {
                throw new Error(notifMsgs.errors.INVALID_USERNAME);
            }

            const hasedPass = await bcrypt.hash(password, user.salt);

            if (hasedPass !== user.password) {
                throw new Error(notifMsgs.errors.INVALID_PASSWORD);
            }

            const token = jwt.sign({ username: user.username }, secret);
            return { user, token, msg: notifMsgs.success.SUCCESSFULL_LOGIN };
        } catch (err) {
            console.log(err);
            throw new Error(notifMsgs.errors.LOGIN_FAILED);
        }
    },

    getUserById: (id) => new Promise((res, rej) => {
        User.findById(id)
        .populate('articles recipes')
        .exec((err, user) => {
            if (err) {
                console.log(err);
                rej(new Error(notifMsgs.errors.COULD_NOT_GET_USER));
            }

            res(user);
        });
    }),

    updateUser: async (id, newUser) => {
        try {
            const user = await User.findById(id);

            for (const[key, value] of Object.entries(newUser)) {
                if (value) {
                    user[key] = value;
                }
            }

            await user.save();
            return { user, msg: notifMsgs.success.USER_UPDATED };
        } catch (err) {
            console.log(err);
            throw new Error(notifMsgs.errors.COULD_NOT_UPDATE_USER);
        }
    },

    addArticleToUser: async (userId, articleId) => {
        try {
            const user = await User.findById(userId);
            const articleIdStr = articleId.toString();
            
            if (!user.articles.includes(articleIdStr)) {
                user.articles.push(articleIdStr);
            }

            await user.save();
        } catch (err) {
            console.log(err);
            throw new Error(notifMsgs.errors.COULD_NOT_ADD_ARTICLE_TO_USER);
        }
    },

    addRecipeToUser: async (userId, recipeId) => {
        try {
            const user = await User.findById(userId);
            const recipeIdStr = recipeId.toString();

            if (!user.recipes.includes(recipeIdStr)) {
                user.recipes.push(recipeIdStr);
            }

            await user.save();
        } catch (err) {
            console.log(err);
            throw new Error(notifMsgs.errors.COULD_NOT_ADD_RECIPE_TO_USER);
        }
    },

    searchUsers: (searchStr) => new Promise((res, rej) => {
        User.find({ 
            $or: [
                { firstName: { $regex: '^' + searchStr } },
                { lastName: { $regex: '^' + searchStr } },
                { username: { $regex: '^' + searchStr } }
            ]
         }).select('_id firstName lastName username')
         .exec((err, users) => {
            if (err) {
                console.log(err);
                rej(new Error(notifMsgs.errors.COULD_NOT_GET_USERS));
            }

            res(users);
         });
    })
};

module.exports = userData;
