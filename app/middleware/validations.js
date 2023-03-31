const { User } = require("../model")
const {
  HTTP_STATUS_CODE,
  MESSAGES,
  ...response
} = require("../utils/response");
const Joi=require("joi");
const isEmailExist = async(req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })   
        if (user)
        {
            response.error(req, res, HTTP_STATUS_CODE.BAD_REQUEST, MESSAGES.EMAIL_ALREADY_EXISTS)
            return;           
        }
        next()
    }
    catch (err) {
        
    }
};
 const isPhoneExist = async (req, res, next) => {
   try {
     const { mobile_no } = req.body;
     const user = await User.findOne({ mobile_no });
     if (user) {
       response.error(
         req,
         res,
         HTTP_STATUS_CODE.BAD_REQUEST,
         MESSAGES.PHONE_NO_EXISTS
       );
       return;
     }
     next();
   } catch (err) {}
 };

const validate = (schema,source='body') =>async(req,res,next)=> {
  try {
    const data = req[source];
    const { error } = schema.validate(data, { abortEarly: false });
    const valid = error == null;
    if (valid)
    {
      return next()
    }
    else
    {
      const { details } = error;
      const message = details.map((i) => i.message).join(',')
      return response.error(req,res,HTTP_STATUS_CODE.BAD_REQUEST,message)
      }
  } 
  catch (err) {
    console.log("Error", err)
    return response.error(req,res,HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,MESSAGES.INTERNAL_SERVER_ERROR,err)
  }
 }


module.exports = {
  isEmailExist,
  isPhoneExist,
  validate
}