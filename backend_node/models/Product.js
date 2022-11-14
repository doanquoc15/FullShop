const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: Object, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    isStock: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true }

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema)