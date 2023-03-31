const router = require("express").Router();
const { login,verifyOtp,signUp } = require("../../controller/cowshed")
const { authentication, verifyOtpForCowshed } = require("../../middleware/auth")
const { isEmailExist, isPhoneExist } = require("../../middleware/validations")
const { validate } = require("../../middleware/validations")
const {
  cowshedLoginSchema,
  cowshedSignUpSchema,
  verifyOtpSchema,
} = require("../../validation/cowshed");

router.post("/login", validate(cowshedLoginSchema) ,login)
router.post("/verify-otp",validate(verifyOtpSchema),verifyOtpForCowshed, verifyOtp)
router.post("/sign-up",validate(cowshedSignUpSchema),isEmailExist,isPhoneExist,signUp)

module.exports = router;
