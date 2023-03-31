const Joi = require("joi");

const userLoginSchema = Joi.object({
    mobile_no:Joi.string().regex(/^\d{10}$/).required(),
    country_code:Joi.string().regex(/^\d{2}$/).required()
})

const verifyOtpSchema = Joi.object({
  mobile_no: Joi.string().regex(/^\d{10}$/).required(),
  country_code: Joi.string().regex(/^\d{2}$/).required(),
  otp: Joi.string().required()
})

const signUpSchema = Joi.object({
  email: Joi.string().required(),
  name: Joi.string().required(),
  address: Joi.string().required()
})

module.exports = {
  userLoginSchema,
  verifyOtpSchema,
  signUpSchema
}
