const router = require("express").Router();
const { login, verifyOtp, signUp } = require("../../controller/user")
const { authentication, verifyOtpForUser } = require("../../middleware/auth")
const { validate } = require("../../middleware/validations")
const { userLoginSchema, verifyOtpSchema ,signUpSchema} = require("../../validation/user");

router.post("/login",validate(userLoginSchema) ,login)
router.post("/verify-otp",validate(verifyOtpSchema),verifyOtpForUser, verifyOtp);
router.post("/sign-up",validate(signUpSchema),authentication,signUp)

module.exports = router;