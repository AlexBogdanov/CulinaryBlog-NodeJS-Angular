const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 12;

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fistName: { type: String, required: true },
    lastName: { type: String, required: true },
    salt: { type: String, required: true },
    roles: [{ type: String, default: 'User' }],
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
});

const User = mongoose.model('User', UserSchema);

User.seedAdminUser = async () => {
    try {
        let users = await User.find();
        if (users.length > 0) return;
        
        bcrypt.genSalt(BCRYPT_SALT_ROUNDS)
            .then(salt => {
                bcrypt.hash('123456', salt)
                    .then(hashedPass => {
                        return User.create({
                            username: 'admin',
                            password: hashedPass,
                            email: 'admin@admin.bg',
                            firstName: 'Admin',
                            lastName: 'Admin',
                            salt,
                            roles: ['Admin']
                        });
                    });
            });
    } catch (e) {
        console.log(e);
    }
};

module.exports = User;
