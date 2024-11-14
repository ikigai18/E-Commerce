const joi = require("joi");

const validateschema = joi.object({
    comment: joi.string().required(),
    rating:joi.number().min(1).max(5),
}).required();

module.exports=validateschema;