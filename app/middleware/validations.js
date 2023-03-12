const { User } = require("../model")
const {
  HTTP_STATUS_CODE,
  MESSAGES,
  ...response
} = require("../utils/response");
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

module.exports = {
    isEmailExist,
   isPhoneExist 
}