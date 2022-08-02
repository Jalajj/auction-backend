const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

exports.create = async (req, res) => {
    try{
      const exists = await User.findOne({email: req.body.email});
      if(!exists){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
         
        //Creating a User
      const newUser = new User({
            username:req.body.username,
            email: req.body.email,
            password:hashedPassword,
      })
      
      //savig user
      await newUser.save();
      const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_KEY, { expiresIn: "30d" });
      res.status(200).json({ result: newUser, token });   
    }else{
      return res.status(400).json({
        error: 'This email is already registered'
      })
    }
  }
  catch(err){
  console.log(err);
  return res.status(400).json({
    error: 'Something went wrong cant sign up'
  })
  }
}