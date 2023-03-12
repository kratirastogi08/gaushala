const router = require("express").Router();
const { login,verifyOtp,signUp } = require("../../controller/cowshed")
const { authentication, verifyOtpForCowshed } = require("../../middleware/auth")
const {isEmailExist,isPhoneExist}=require("../../middleware/validations")

router.post("/login", login)
router.post("/verify-otp", verifyOtpForCowshed, verifyOtp)
router.post("/sign-up",isEmailExist,isPhoneExist,signUp)

module.exports = router;
