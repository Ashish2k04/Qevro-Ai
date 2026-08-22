import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username required!'],
        unique: true,
        trim: true
    },
    email: {
        type:  String,
        required: [true, 'Email required!'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password required!'],
        trim: true
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function(userPass) {
    await bcrypt.compare(userPass, this.password);
}

const userModel = mongoose.model('users', userSchema);

export default userModel;