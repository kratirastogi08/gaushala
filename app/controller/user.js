const { Auth, User } = require("../model");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { generateOTP } = require("../utils/helper");
const {
  HTTP_STATUS_CODE,
  MESSAGES,
  ...response
} = require("../utils/response");
const login = async (req, res, next) => {
  try {
    const { mobile_no, country_code } = req.body;
    const otp = generateOTP();
    const hashedOtp = jwt.sign(
      { mobile_no, country_code, otp },
      config.secret,
      { expiresIn: "30m" }
    );
    //sendSms
     response.success(req, res, HTTP_STATUS_CODE.OK, MESSAGES.OTP_SENT, {
      otp,
      token: hashedOtp,
    });
  } catch (err) {
    console.log(err);
  }
};
const verifyOtp = async (req, res, next) => {
  try {
    const { mobile_no, country_code } = req.body;

    let user = await User.findOne({ mobile_no, country_code });
    if (!user) {
      user = await User.create({
        mobile_no,
        country_code,
        user_type: "user",
        is_mobile_verify: true,
      });
    }
    const auth_token = jwt.sign({ user_id: user._id }, config.secret, {
      expiresIn: "1d",
    });
    await Auth.create({
      user_id: user._id,
      auth_token,
    });
     response.success(
      req,
      res,
      HTTP_STATUS_CODE.OK,
      MESSAGES.OTP_VERIFIED,
      {
        auth_token,
        is_profile_completed: user?.is_profile_completed,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const signUp = async (req, res, next) => {
  try {
    const { email, name, address } = req.body;
    const { user_id } = req.data;
    const newUser = await User.findOneAndUpdate(
      {
        _id: user_id,
      },
      { email, name, address, is_profile_completed: true },
      { new: true }
    );
     response.success(req,res,HTTP_STATUS_CODE.OK,MESSAGES.UPDATED_SUCCESS,{data:newUser})
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  login,
  verifyOtp,
  signUp,
};
