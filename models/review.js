const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const reviewschema = new Schema({
    comment:{
        type:String,
    },
    rating:{
        type:Number,
        min:1,
        max:5,
    },
});

let Review = mongoose.model("Review",reviewschema);
module.exports=Review;