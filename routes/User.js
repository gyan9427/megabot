const express = require('express');
const { CreateUser, UserLogin } = require('../controller/User');
const router = express.Router();

router.post('/register',CreateUser).post('/login',UserLogin);

module.exports = router;