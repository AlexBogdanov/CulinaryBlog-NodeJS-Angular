const { userData } = require('./../data');
const cloneOnly = require('./../utilities/clone-only');

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
    }
};

module.exports = userController;
