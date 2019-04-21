const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    preparation: { type: String, required: true, minlength: 30 },
    products: [{}],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    img: { type: String, default: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/7/21/1437486373382/63d2e102-df40-46f3-a72d-0c3aac39eb8e-2060x1190.jpeg?width=700&quality=85&auto=format&fit=max&s=b5ccb0e044569327b14944d202ddd04c' }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
