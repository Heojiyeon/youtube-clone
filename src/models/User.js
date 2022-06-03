import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    password2: { type: String, required: true },
    location: String,
});

userSchema.pre('save', async function () {
    if (this.password === this.password2) {
        this.password = await bcrypt.hash(this.password, 5);
    }

});

const User = mongoose.model('User', userSchema);
export default User;