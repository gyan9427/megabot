const express = require('express');
const router = express.Router();
const {getChatResponse} = require('../controller/chat')

router.get('/',(req,res)=>{
    res.status(200).json({msg:'Hi this is MegaBot'});
}).post('/chat',getChatResponse)

module.exports = router;