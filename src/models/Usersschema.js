import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        numero: {
            type: String,
           
        },
        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["admin", "doctor", "patient", "enterprise"],
            default: "patient"
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;