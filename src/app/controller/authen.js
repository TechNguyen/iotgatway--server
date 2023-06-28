const Account = require('../models/account')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookie = require('cookie-parser')
class Authen {
    async login(req,res,next) {
        try {
            // get data from form
            const  {username, password} = req.body
            //validation 
            if(!(username && password)) {
                res.status(400).send("please send all data")
            }
            // find in db
            const account = await Account.findOne({username, password})
            // match password

            // const hashPass = await bcrypt.compare(password, account.password)
            console.log(account);
            if(account) {
                // take accesstoken
                const token = jwt.sign({
                    id: account._id
                }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })
                account.token = token
                account.password = undefined
                //section cookie
                const options = {
                    expries: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                res.status(200).cookie("token", token, options).json({
                    token,
                    username: account.username
                })
            }
        } catch(error) {
            res.status(403).json({success: false, message: error.message})
        }
    }
}


module.exports = new Authen();