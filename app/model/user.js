const db = require("../config/database").getDB();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: String,
    profile_pic: String,
    email: {
      type: String,
      unique: true,
    },
    is_email_verify: {
      type: Boolean,
      default: false,
    },
    country_code: {
      type: String,
      default: "+91",
    },
    mobile_no: {
      type: String,
      unique: true,
    },
    is_mobile_verify: {
      type: Boolean,
      default: false,
    },
    password: String,
    address: String,
    user_type: {
      type: String,
      enum: ["user", "admin", "cowshed"],
    },
    status: {
      type: String,
      enum: ["block", "unblock"],
      default: "unblock",
    },
    registration_no: String,
    is_profile_completed: {
      type: Boolean,
      default:false
    },
    otp:String,
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
userSchema.pre("save", function (next) {
  const user = this;
  if (this.isModified("password")) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          } else {
            user.password = hash;
            next();
          }
        });
      }
    });
  } else {
    return next();
  }
});
const User = db.model("users", userSchema);
module.exports = User;
