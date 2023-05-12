const Mongoose = require("mongoose");

const connectDB = async (URI)=>{
    try {
        await Mongoose.connect(URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB connected successfully...");    
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;