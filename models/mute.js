const mongoose = require("mongoose");
const Product = require("./product.js");
const Schema = mongoose.Schema;

const muteschema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    mutedproduct : [{
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },]
})

const Mute = mongoose.model("Mute", muteschema);
module.exports = Mute;
