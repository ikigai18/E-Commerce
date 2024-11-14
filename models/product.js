const mongoose=require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const productschema = new Schema({
    brand:{
        type:String,
        required:true
    },
    productname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review",
    },]
});
//mongoose middleware // parent delete then child delete by middleware
productschema.post("findOneAndDelete",async(product)=>{
    if(product){
    await Review.deleteMany({_id:{$in:product.reviews}});//parent schema deleted and child schema deleted by mongoose middleware
    }
})
let Product = mongoose.model("Product",productschema);
module.exports=Product;