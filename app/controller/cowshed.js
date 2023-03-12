const { Auth, User } = require("../model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { sendEmail } = require("../utils/email");
const { generateOTP } = require("../utils/helper");
const {
  HTTP_STATUS_CODE,
  MESSAGES,
  ...response
} = require("../utils/response");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
      if (user) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch)
          {
              response.error(
                req,
                res,
                HTTP_STATUS_CODE.UNAUTHORIZED,
                MESSAGES.WRONG_PASSWORD
              );
              return;
            }
      if (user.status === "block") {
         response.error(
          req,
          res,
          HTTP_STATUS_CODE.ACCESS_FORBIDDEN,
          MESSAGES.USER_BLOCKED
         );
          return;
      }
      const token = jwt.sign(
        {
          user_id: user._id,
        },
        config.secret,
        {
          expiresIn: "1d",
        }
      );
      await Auth.create({
        user_id: user._id,
        auth_token: token,
      });
       response.success(
        req,
        res,
        HTTP_STATUS_CODE.OK,
        MESSAGES.LOGIN_SUCCESSFUL,
        { auth_token: token }
      );
    }
     response.error(
      req,
      res,
      HTTP_STATUS_CODE.UNAUTHORIZED,
      MESSAGES.USER_NOT_FOUND
    );
  } catch (err) {
    response.error(req,res,HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,MESSAGES.SOMETHING_WRONG,err)
  }
};

const signUp = async (req, res, next) => {
  try {
    const {
      name,
      registration_no,
      mobile_no,
      email,
      password,
      confirm_password,
    } = req.body;
    const otp = generateOTP();
    const hashedOtp = jwt.sign(
      { name, registration_no, mobile_no, email, password, otp },
      config.secret,
      { expiresIn: "30m" }
    );
    const data = await sendEmail(email, "Otp", otp);
    if (data) {
      response.success(
        req,
        res,
        HTTP_STATUS_CODE.OK,
        MESSAGES.API_SUCCESS,
        { token: hashedOtp }
      );
    } else {
      response.error(req,res,HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,MESSAGES.SOMETHING_WRONG)
    }
  } catch (err) {
    console.log(err);
  }
};
const verifyOtp = async (req, res, next) => {
    try {
    const {
      email,
      mobile_no,
      registration_no,
      name,
      password,
      confirm_password,
    } = req.data;
    const newUser = await User.create({
      name,
      email,
      mobile_no,
      registration_no,
      password,
      is_email_verify: true,
      user_type: "cowshed",
    });
    const auth_token = jwt.sign({ user_id: newUser._id }, config.secret, {
      expiresIn: "1d",
    });
    await Auth.create({
      user_id: newUser._id,
      auth_token,
    });
     response.success(req,res,HTTP_STATUS_CODE.OK,MESSAGES.OTP_VERIFIED,{auth_token})
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  login,
  signUp,
  verifyOtp,
};
