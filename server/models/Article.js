const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 5 },
    description: { type: String, required: true, minlength: 30 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    img: { type: String, default: 'https://www.newzealand.com/assets/Tourism-NZ/Wellington/0a81ae01e5/img-1536332736-2099-29766-24254B24-9C42-B251-4E12502EA2CF7FB7__FocalPointCropWzQyMCw5NjAsNTAsNTAsNzUsImpwZyIsNjUsMi41XQ.jpg' }
});

module.exports = mongoose.model('Article', ArticleSchema);
