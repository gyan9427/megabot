require('dotenv').config();
const { urlencoded } = require("express");
const express = require("express");
const app = express();

const dbConnection = require('./DB/db');


app.use(express.json());

app.use(urlencoded({extended:false}))

app.use('/megabot/v1.0/',require('./routes/chat'));
app.use('/megabot/v1.0/user/',require('./routes/User'));

const connect = async ()=>{
    dbConnection(process.env.MONGO_URI)
    app.listen(3000,()=>{
        console.log("connection made successfully...")
    })  
}

connect();

process.on('unhandledRejection',(reason,promise)=>{
    console.log(`unhandled promise: ${promise} ::::: reason: ${reason}`);
});

