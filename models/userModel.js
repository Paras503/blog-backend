const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
             match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        }
    },
        
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User