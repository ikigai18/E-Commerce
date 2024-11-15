const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./product.js");

const historyschema = new Schema({
    store: {
        type: Schema.Types.ObjectId,
        ref: "Product", 
    },
    time: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const History = mongoose.model("History", historyschema);
module.exports = History;
