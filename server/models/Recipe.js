const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    preparation: { type: String, required: true, minlength: 30 },
    products: [{}],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    img: { type: String, default: 'http://www.homechef.com/assets/cards/fb-cb033e1a958d79ff21e99cffbaf567bf.jpg' }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
