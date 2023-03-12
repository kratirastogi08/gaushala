const router = require("express").Router();
const { login, verifyOtp, signUp } = require("../../controller/user")
const {authentication,verifyOtpForUser}=require("../../middleware/auth")

router.post("/login", login)
router.post("/verify-otp", verifyOtpForUser, verifyOtp);
router.post("/sign-up",authentication,signUp)

module.exports = router;