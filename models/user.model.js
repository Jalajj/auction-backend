const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
      },
    username: String,
    password: String,
    photo: String,

}, {timestamps:true})

const User = mongoose.model('User', userSchema);

module.exports = User;