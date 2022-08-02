const {OAuth2Client} = require('google-auth-library');
const User = require("../models/user.model.js");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleAuth = (req,res) => {
    const {tokenId} = req.body;
    client.verifyIdToken({idToken:tokenId, audience: process.env.GOOGLE_CLIENT_ID}).then((response) => {
        const {email_verified, name, email, picture} = response.payload;
        console.log(response.payload);
        if(email_verified){
           User.findOne({email}).then(async (user) => {
               if(user){
                const token= jwt.sign({_id:user._id}, process.env.JWT_KEY, { expiresIn: "100h" });
                // const username = user.username || 'user';
                const {_id, image} = user;
               return res.status(200).json({token : token, user})
               }
               else{
                     let password = email+process.env.JWT_KEY;
                     const salt = await bcrypt.genSalt(10);
                     const hashedPassword = await bcrypt.hash(password, salt)
                    //  let existingName = User.findOne({username:name})
                    //  if(existingName){
                    //   var newUser = await new User({username: '', email, password:hashedPassword, photo: picture, verified :true})
                    //   newUser.save().then((data) => {
                    //     const token= jwt.sign({_id:data._id},process.env.JWT_KEY, { expiresIn: "7d" });
                    //        const {_id,email, photo} = newUser;
                    //        res.json({user: {_id, email, token, photo}});
                    // }).catch((err) => {
                    //     res.status(400).json(err)
                    //     console.log(err);
                    // })
                    //  }else{
                     var newUser = await new User({username: name, email, password:hashedPassword, image: picture})
                     newUser.save().then((data) => {
                        const token= jwt.sign({_id:data._id},process.env.JWT_KEY, { expiresIn: "7d" });
                           const {_id, username, email, image} = newUser;
                           res.json({token , newUser});
                    }).catch((err) => {
                        return res.status(400).json({
                            error: err
                          })
                      
                    })
                       
               }
           }).catch((err) => {
            return res.status(400).json({
                error: err
              })
           })  
        }
    }).catch((err) => {
        return res.status(400).json({
            error: err
          })
    })
}