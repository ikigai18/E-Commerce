const joi = require("joi");

const validateschema = joi.object({
    brand : joi.string().required(),
    productname:joi.string().required(),
    description: joi.string().required(),
    price : joi.number().required().min(99),
    image : joi.string().required(),
}).required();

module.exports=validateschema;