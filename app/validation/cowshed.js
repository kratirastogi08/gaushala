const Joi = require("joi");
const PASSWORD_REGEX =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,16}$";
const cowshedLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const cowshedSignUpSchema = Joi.object({
  name: Joi.string().required(),
  registration_no: Joi.string().required(),
  mobile_no: Joi.string()
    .regex(/^\d{10}$/)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp(PASSWORD_REGEX)).required(),
  confirm_password: Joi.ref('password'),
});


const verifyOtpSchema = Joi.object({
  otp: Joi.string().required(),
  email: Joi.string().required()
});



module.exports = {
  cowshedLoginSchema,
  cowshedSignUpSchema,
  verifyOtpSchema,
};
