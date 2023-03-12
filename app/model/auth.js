const db = require("../config/database").getDB();
const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    auth_token: {
        type:String
    },
    device_id: {
        type: String
    },
    device_type: {
        type: String
    },
    device_token: {
        type: String
    },
}, {
    timestamps: true,
    versionKey: false,
    collection:"auth"
})

const Auth = db.model("auth", authSchema)
module.exports = Auth;
