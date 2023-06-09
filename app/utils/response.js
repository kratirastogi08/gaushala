const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  UPDATED: 202,
  NO_CONTENT: 204,
  PARTIAL_CONTENT: 206,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENY_REQUIRED: 402,
  ACCESS_FORBIDDEN: 403,
  URL_NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  UNREGISTERED: 410,
  PAYLOAD_TOO_LARGE: 413,
  SOCIAL_ACCOUNT_NOT_EXIST: 424,
  CONCURRENT_LIMITED_EXCEEDED: 429,
  EMAIL_NOT_VERIFIED: 432,
  MOBILE_NUMBER_NOT_VERIFIED: 433,
  USER_BLOCKED: 434,
  USER_DELETED: 435,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SHUTDOWN: 503,
  INTRO__VIDEO_ONE: 511,
  INTRO__VIDEO_TWO: 512,
  INTRO__VIDEO_THREE: 513, // not in use
  PROFILE_AGE: 514,
  PROFILE_GOAL: 515,
  CHALLENGE_SCREEN: 516,
  HOME_SCREEN: 517,
};
const MESSAGES = {
  SIGNUP_SUCCESSFUL: "User registered successfully",
  LOGIN_SUCCESSFUL: "User logged in successfully",
  USER_REGISTERED_LOGIN:
    "User registered successfully. Please login to verify your account.",
  API_SUCCESS: "Success",
  LOGOUT_SUCCESSFUL: "User logged out successfully",
  PASSWORD_UPDATED: "Password has been Updated!",
  FORGOT_PASSWORD: "Reset link Sent on your mail",
  NOT_MATCHED: "Not Matched Yet",
  DELETED: "Deleted successfully.'",
  OTP_SENT: "'Otp sent successfully'",
  EMAIL_VERIFIED: "'Email successfully verified '",
  P_UPDATE: " 'Profile update successfully'",
  UPDATE_EMAIL: " 'Email update successfully'",
  TOKEN_EXPIRED: "'Token Expired '",
  ALREADY_REGISTERED: " 'An account has already been created.",
  REG_ALREADY_REGISTERED:
    "'An account has already been created with this registration number.'",
  UPDATE_ERROR: " 'Error in updating data.'",
  API_ERROR: " 'Error in Api Execution.'",
  VALIDATION_ERROR: " 'Validation error.'",
  FAILED_TO_ADD: " 'Failed to Add Data.'",
  INVALID_CREDENTIALS: "'Invalid Credentials'",
  EMAIL_FAILURE: " 'Email not sent.'",
  EMAIL_ALREADY_EXISTS: " 'Email already exists.'",
  USER_NOT_FOUND: " 'User Not Found'",
  UNAUTHORIZED: "'Unauthorized Access.'",
  FAILED_TO_UPDATE: "Failed to Update.",
  FAILED_TO_DELETE: "'Failed to Delete Data.'",
  SOMETHING_WRONG: "Something went wrong",
  INVALID_EMAIL: "'invalid email id'",
  INVALID_OTP: "'invalid otp'",
  SIGNUP_FAILED: "'Your signUp failed'",
  EMAIL_NOT_VERIFIED: "'Email is not verified'",
  INVALID_TOKEN: "'Your token is invalid.'",
  EMAIL_v_FAILED: "'Email verification is failed'",
  MISSING_TOKEN: "'Missing token'",
  MISSING_P: "'Missing parameter'",
  OTP_NOT_SEND: "Otp not send successfully",
  OTP_EXPIRED: "Otp has expired",
  NOT_FOUND: "Data not found",
  TOTAL_LOGIN:
    "You've reached the maximum login limits. Please logout of other devices and login again.",
  WRONG_PASSWORD: "'Incorrect password'",
  INVALID_ROUTE: "Invalid route",
  MISSING_API_KEY: "Missing API key",
  INVALID_API_KEY: "Api key is invalid",
  USER_BLOCKED: "User is blocked",
  OTP_VERIFIED: " otp verified",
  UPDATED_SUCCESS: "Updated successfully",
  OTP_INCORRECT: "Otp incorrect",
  PHONE_NO_EXISTS: "Phone number already exists",
  BAD_REQUEST: "Bad request",
  INTERNAL_SERVER_ERROR:"Internal Server Error",
};
const success = (req, res, code, message, result = {}) => {
  try {
    const response = {
      success: true,
      status_code: code,
      result,
      message,
    };
    return res.status(code).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      status_code: 500,
      error: result,
      message: MESSAGES.SOMETHING_WRONG,
    });
  }
};

const error = (req, res, code, message, err = {}) => {
  try {
    const response = {
      success: false,
      status_code: code,
      err,
      message: err?.message ? err?.message : message,
    };
    return res.status(code).json(response);
  } catch (err) {
    return res.status(500).json({
      success: false,
      status_code: 500,
      error,
      message: MESSAGES.SOMETHING_WRONG,
    });
  }
};

module.exports = {
  HTTP_STATUS_CODE,
  MESSAGES,
  success,
  error,
};
