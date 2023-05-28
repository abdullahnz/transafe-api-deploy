import Joi from 'joi';

export const createTransactionSchema = Joi.object({
   category: Joi.string().required().valid('fisik', 'digital'),
   name: Joi.string().min(5).max(30).required().messages({
      'string.min': 'Username must be at least 5 character',
      'string.max': 'Username must be max 30 character',
   }),
   desc: Joi.string().min(15).max(100).required().messages({
      'string.min': 'Description must be at least 15 character',
      'string.max': 'Description must be max 100 character',
   }),
   price: Joi.number().integer().required(),
   negotiable: Joi.boolean().valid(false, true),
   shipping_fee: Joi.number().integer(),
   images: Joi.any(),
   weight: Joi.number().integer(),
   tax: Joi.number().integer().required(),
});
