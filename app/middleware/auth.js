const jwt = require("jsonwebtoken");
const { secret } = require("../config")
const {
  HTTP_STATUS_CODE,
  MESSAGES,
  ...response
} = require("../utils/response");
const authentication = (req,res,next) => {
    try {
     let token = req.headers.authorization 
        token = token.replace("Bearer ", "")  
        if (!token)
        {
            response.error(req, res, HTTP_STATUS_CODE.UNAUTHORIZED, MESSAGES.UNAUTHORIZED)
            return;
        }
        jwt.verify(token, secret, (error, decoded) => {
          if (error) {
            switch (error.name) {
                case "TokenExpiredError":
                    response.error(req, res, HTTP_STATUS_CODE.UNAUTHORIZED, MESSAGES.TOKEN_EXPIRED)
                    break;
                case "JsonWebTokenError":
                    response.error(
                        req,
                        res,
                        HTTP_STATUS_CODE.UNAUTHORIZED,
                        MESSAGES.INVALID_TOKEN
                    );
                    break;
            }
            } 
            const { user_id } = decoded;
            req.data = {
                user_id
            } 
            next()
        })
    }
    catch (err)
    {
      console.log(err)
    }
}
const verifyOtpForUser = async (req, res, next) => {
    try {
        let token = req.headers.token 
        
        token = token.replace("Bearer ", "")  
        if (!token)
        {
             response.error(
              req,
              res,
              HTTP_STATUS_CODE.UNAUTHORIZED,
              MESSAGES.UNAUTHORIZED
             );
            return;
        }
        jwt.verify(token, secret, (error, decoded) => {
          if (error) {
            switch (error.name) {
                case "TokenExpiredError":
                    response.error(
                        req,
                        res,
                        HTTP_STATUS_CODE.UNAUTHORIZED,
                        MESSAGES.OTP_EXPIRED
                    );
                    break;
                case "JsonWebTokenError":
                    response.error(
                        req,
                        res,
                        HTTP_STATUS_CODE.UNAUTHORIZED,
                        MESSAGES.INVALID_TOKEN
                    );
                    return;
            }
            } 
            if (
              req.body.mobile_no != decoded.mobile_no ||
              req.body.country_code != decoded.country_code ||
              req.body.otp != decoded.otp
            ) {
               response.error(
                req,
                res,
                HTTP_STATUS_CODE.BAD_REQUEST,
                MESSAGES.OTP_INCORRECT
               );
                return;
            }
            next()
        }) 
    }
    catch (err) {
       console.log(err) 
    }
}

const verifyOtpForCowshed = async (req, res, next) => {
  try {
    let token = req.headers.token;

    token = token.replace("Bearer ", "");
    if (!token) {
       response.error(
        req,
        res,
        HTTP_STATUS_CODE.UNAUTHORIZED,
        MESSAGES.UNAUTHORIZED
       );
        return;
    }
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        switch (error.name) {
            case "TokenExpiredError":
                response.error(
                    req,
                    res,
                    HTTP_STATUS_CODE.UNAUTHORIZED,
                    MESSAGES.OTP_EXPIRED
                );
                break;
            case "JsonWebTokenError":
                response.error(
                    req,
                    res,
                    HTTP_STATUS_CODE.UNAUTHORIZED,
                    MESSAGES.INVALID_TOKEN
                );
                break;
        }
      }
      if (req.body.email != decoded.email || req.body.otp != decoded.otp) {
        response.error(
                req,
                res,
                HTTP_STATUS_CODE.BAD_REQUEST,
                MESSAGES.OTP_INCORRECT
        );
        return;
      }
        req.data = {
            email: decoded.email,
            registration_no: decoded.registration_no,
            mobile_no: decoded.mobile_no,
            name: decoded.name,
            password: decoded.password,
            confirm_password:decoded.confirm_password

      }; 
      next();
    });
      
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
    authentication,
    verifyOtpForUser,
    verifyOtpForCowshed
}