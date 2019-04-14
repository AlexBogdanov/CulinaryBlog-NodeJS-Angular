const userRouter = require('./user-router');
const articleRouter = require('./article-router');
const recipeRouter = require('./recipe-router');

module.exports = app => {
    app
        .use('/user', userRouter)
        .use('/article', articleRouter)
        .use('/recipe', recipeRouter);
}