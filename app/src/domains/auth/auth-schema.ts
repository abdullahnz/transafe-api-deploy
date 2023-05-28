import Joi from 'joi';

export const registerSchema = Joi.object({
   name: Joi.string().required().max(50).messages({
      'string.max': 'Username must be max 50 character',
   }),

   username: Joi.string().required().min(5).max(20).messages({
      'string.min': 'Username must be at least 5 character',
      'string.max': 'Username must be max 20 character',
   }),

   phone_number: Joi.string().required().min(8).max(15).messages({
      'number.min': 'Phone number must be at least 8 number',
      'number.max': 'Phone number must be max 15 number',
   }),

   email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }),

   password: Joi.string()
      .required()
      .min(5)
      .max(15)
      .alphanum()
      .label('Password'),

   passwordConfirmation: Joi.any()
      .valid(Joi.ref('password'))
      .required()
      .messages({
         'any.only': 'Password Confirmation does not match',
      }),
});

export const loginSchema = Joi.object({
   username: Joi.string().required().min(5).max(20).label('Username').messages({
      'string.min': 'Username must be at least 5 character',
      'string.max': 'Username must be max 20 character',
   }),

   password: Joi.string().required().min(5).max(15).alphanum(),
});
