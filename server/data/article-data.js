const Article = require('./../models/Article');
const notifMsgs = require('./../constants/notification-messages');

const articleData = {
    getAll: () => new Promise((res, rej) => {
        Article.find((err, articles) => {
            if (err) {
                console.log(err);
                return rej(new Error(notifMsgs.errors.COULD_NOT_GET_ARTICLES));
            }

            return res(articles);
        });
    }),
    
    getById: (id) => new Promise((res, rej) => {
        Article.findById(id, (err, article) => {
            if (err) {
                console.log(err);
                return rej(new Error(notifMsgs.errors.COULD_NOT_GET_ARTICLE));
            }

            return res(article);
        });
    }),
    
    create: async (articleInput) => {
        try {
            const article = await Article.create(articleInput);
            return { article, msg: notifMsgs.success.ARTICLE_CREATED };
        } catch (err) {
            console.log(err);
            throw new Error(notifMsgs.errors.COULD_NOT_CREATE_ARTICLE);
        }
    },

    edit: async (id, newArticle) => {
        try {
            const article = await Article.findById(id);

            for (const [key, value] of Object.entries(newArticle)) {
                article[key] = value;
            }

            await article.save();
            return { article, msg: notifMsgs.success.ARTICLE_UPDATED };
        } catch (err) {
            console.log(err);
            throw new Error(notifMsgs.errors.COULD_NOT_UPDATE_ARTICLE);
        }
    },

    delete: (id) => new Promise((res, rej) => {
        Article.findByIdAndDelete(id, (err) => {
            if (err) {
                console.log(err);
                return rej(new Error(notifMsgs.errors.COULD_NOT_DELETE_ARTICLE));
            }

            return res({ msg: notifMsgs.success.ARTICLE_DELETED });
        });
    })
};

module.exports = articleData;
