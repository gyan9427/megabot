const { urlencoded } = require("express");
const express = require("express");
const app = express();
app.use(express.json());
app.use(urlencoded({extended:false}))

app.use('/megabot/v1.0/',require('./routes/chat'))


app.listen(3000,()=>{
    console.log("connected to port 3000....")
})