import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        maxlength: [12, "Password must be at most 12 characters"],
        select: false,
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    phone: {
        type: Number,
        required: [true, "Phone is required"],
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User",
        required: [true, "Role is required"],
    },
    avatar: {
        public_id: String,
        secure_url: String,
    }
}, {
    timestamps: true
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User; 
