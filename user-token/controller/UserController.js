const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RegisterUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            res.status(400);
            throw new Error("All Fields are Mandatory");
        }

        const emailTaken = await userModel.findOne({ email });
        if (emailTaken) {
            res.status(400);
            throw new Error("Email Already Taken");
        }

        const encryptPwd = await bcrypt.hash(password, 10);

        const userRegister = await userModel.create({
            username,
            email,
            password: encryptPwd,
        });

        if (userRegister) {
            res.status(201).json(userRegister);
        } else {
            res.status(400);
            throw new Error("User Not Created");
        }
    } catch (error) {
        next(error);
    }
};

const LoginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            res.status(400);
            throw new Error("All Fields are Mandatory");
        }

        const userCheck = await userModel.findOne({ email });
        if (userCheck && (await bcrypt.compare(password, userCheck.password))) {
            const accessToken = jwt.sign({
                user: {
                    username: userCheck.username, email: userCheck.email, password: userCheck.password
                }
            }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10m"})
            res.status(200).json(accessToken)
        }
        else{
            res.status(400);
            throw new Error("Email and Password is not valid");
        }
    } catch (error) {
        next(error);
    }

}
const currentUser = (req, res) => {
    res.json({email: req.user.email, username:req.user.username})
}
module.exports = { RegisterUser, LoginUser, currentUser }