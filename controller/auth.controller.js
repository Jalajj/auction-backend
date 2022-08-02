const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.signin = async (req, res) => {
    try {
      let user = await User.findOne({
        "email": req.body.email
      })
      if (!user)
        return res.status('401').json({
          error: "User not found"
        })
        const validPassword = await bcrypt.compare(req.body.password, user.password)
      if (!validPassword) {
        return res.status('401').send({
          error: "Email and password don't match."
        })
      }
  
      const token = jwt.sign({
        _id: user._id
      }, process.env.JWT_KEY)
  
      res.cookie("t", token, {
        expire: new Date() + 9999
      })
  
      return res.json({
        token,
        user
      })
  
    } catch (err) {
      return res.status(400).json({
        error: 'Cant sign in'
      })
  
    }
  }

exports.signout = (req, res) => {
    res.clearCookie("t")
    return res.status('200').json({
      message: "signed out"
    })
  }