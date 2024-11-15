const mongoose = require("mongoose");
const Schema = mongoose.Schema;

new muteschema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    mutedurl : [{
        type: String,
        required: true
    },]
})

const Mute = mongoose.model("Mute", muteschema);
module.exports = Mute;
