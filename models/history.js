const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./product.js");
const User = require("./user.js");
const historyschema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    historydata: [
        {
            store: {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
            time: {
                type: Date,
                default: Date.now,
                required: true
            }
        }
    ]
})


const History = mongoose.model("History", historyschema);
module.exports = History;
