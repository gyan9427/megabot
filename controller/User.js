const User = require("../model/User");
const bcrypt = require('bcrypt');

const CreateUser = async (req, res, next) => {

    const { username, password } = req.body;
    if (password.length < 6) {
        res.status(400).json({ msg: "minimum length must be 6" });
    }

    bcrypt.hash(password, 10).then(async (hash) => {

        await User.create({
            username: username,
            password: hash
        }).then(user => {
            res.status(200).json({ msg: `User successfully created ${user}` });
        }).catch(error => {
            res.status(401).json({ msg: error });
        })
    })
}

const UserLogin = async (req, res, next) => {

    const { username, password } = req.body;
    if (!username || !password) res.status(401).json({ msg: "Message and password required" })
    const user = await User.findOne({ username: username})
    try {
        if (!user) {
            res.status(401).json({
                status: "Login Unsuccessful",
                msg: "User not found"
            })
        }
        else {

            bcrypt.compare(password, user.password).then(result => {
                result
                    ? res.status(200).json({
                        message: "Login successful",
                        user,
                    })
                    : res.status(400).json({ message: "Login not succesful" })
            })
        }
    } catch (error) {
        res.status(401).json({ error: error })
    }

}

// const UpdateUser = async (req,res) =>{
//     const {role,id} = req.body;
//     if(role && id){
//         if(role == "admin"){
//             await User.findById(id).then((user)=>{
//                 if(user.role !== 'admin'){
//                     user.role = role;
//                     user.save((err)=>{
//                         if (err) {
//                             res
//                               .status("400")
//                               .json({ message: "An error occurred", error: err.message });
//                             process.exit(1);
//                         }

//                         res.status("201").json({ message: "Update successful", user });
//                     })
//                 }
//             })
//         }
//         else {
//             res.status(400).json({ message: "User is already an Admin" });
//           }
//         })
//         .catch((error) => {
//           res
//             .status(400)
//             .json({ message: "An error occurred", error: error.message });
//         });
//     }
// }

module.exports = {
    CreateUser,
    UserLogin
}