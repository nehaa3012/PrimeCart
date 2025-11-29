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
        select: false,
    },
    address: {
        type: String,
        required: false,
    },
    phone: {
        type: Number,
        required: false,
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

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User; 
