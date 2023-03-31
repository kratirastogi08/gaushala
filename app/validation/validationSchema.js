const Joi = require('joi')
const signupSchema = Joi.object().keys({
    firstName: Joi.string().required().empty(''),
    lastName: Joi.string().required().empty(''),
    phone: Joi.string().regex(/^[7-9]{1}[0-9]{9}$/).required().empty('').error(errors => {
        errors.forEach(err => {
            switch (err.type) {
                case "string.regex.base":
                    err.message = "Invalid phone number!";
                    break;
                default:
                    break;
            }    
        })
        return errors;
    }),
    email: Joi.string().email().required().empty(''),
    password: Joi.string().min(8).max(15).required().empty(''),
    role:Joi.string().optional().empty('')
})



module.exports = {
    signupSchema
}