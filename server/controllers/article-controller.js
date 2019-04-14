const { articleData } = require('./../data');
const cloneOnly = require('./../utilities/clone-only');

const validProperties = [
    'title',
    'description',
    'author',
    'likes'
];

const articleController = {
    getAll: (req, res) => {
        articleData.getAll()
          .then(res.success)
          .catch(err => {
              console.log(err);
              res.error(err.message, null, 500);
          });
    },

    getById: (req, res) => {
        articleData.getById(req.params.articleId)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    create: (req, res) => {
        const article = cloneOnly(req.body, validProperties);

        articleData.create(article)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    edit: (req, res) => {
        const article = cloneOnly(req.body, validProperties);

        articleData.edit(req.body.articleId, article)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    },

    delete: (req, res) => {
        articleData.delete(req.params.articleId)
          .then(res.success)
          .catch(err => {
            console.log(err);
            res.error(err.message, null, 500);
          });
    }
};

module.exports = articleController;
