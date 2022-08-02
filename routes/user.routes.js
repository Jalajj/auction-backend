const express = require("express");
const router = express.Router();
const {create} = require('../controller/user.controller')
const {signin, signout} = require('../controller/auth.controller')
const {googleAuth} = require('../controller/googleAuth')

router.post('/signup', create)
router.post('/signin', signin)
router.get('/logout', signout)
router.post('/google/auth',googleAuth)

module.exports = router;