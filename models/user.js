const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userschema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

userschema.plugin(passportLocalMongoose);
const User= mongoose.model("User",userschema);
module.exports=User;