const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        address: { type: Object, required: true },
        fullname: { type: Object, required: true },
        phone: { type: Object, required: true },
        card: { type: Object, required: true },
        date: { type: String, required: true },
        cvc: { type: String, required: true },
        amount: { type: Number, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);