const { articleData } = require('./../data');
const cloneOnly = require('./../utilities/clone-only');

const validProperties = [
    'title',
    'description',
    'author',
    'likes',
    'img'
];

const articleController = {
    getAll: (req, res) => {
        articleData.getAll()
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.error(err.message);
          });
    },

    getById: (req, res) => {
        articleData.getById(req.params.articleId)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message);
          });
    },

    create: (req, res) => {
        const article = cloneOnly(req.body, validProperties);

        articleData.create(article)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message);
          });
    },

    edit: (req, res) => {
        const article = cloneOnly(req.body.article, validProperties);

        articleData.edit(req.body.articleId, article)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message);
          });
    },

    delete: (req, res) => {
        articleData.delete(req.params.articleId)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message);
          });
    },

    getUserArticles: (req, res) => {
      articleData.getArticlesByUserId(req.user._id)
        .then(res.success)
        .catch(err => {
          console.log(err);
          res.error(err.message);
        })
    }
};

module.exports = articleController;
