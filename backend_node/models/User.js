const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, default: 'https://dep365.com/wp-content/uploads/2021/07/bi-kip-tao-dang-chup-anh-dep-voi-goc-ben-trai-scaled.jpg' },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)