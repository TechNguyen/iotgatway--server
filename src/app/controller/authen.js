const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookie = require('cookie-parser')
const db = require('../../config/database/index')

class Authen {
    async login(req,res,next) {
        try {
            // get data from form
            const  {username, password} = req.body
            //validation 
            if(!(username && password)) {
                res.status(400).json({
                    message: 'Username and password is required'
                })
            }
            // find in db
            let sqlString = `
                select * from IoT.dbo.Users where username = '${username}' and password = '${password}'
            `
            const request = new db.sql.Request() 
            request.query(sqlString, (err,data) => {
                if(err) {
                    res.status(400).json({
                        message: 'Not found account'
                    })
                } else {
                    const account = data.recordset[0]

                    if(!account) {
                        res.status(400).json({
                            message: 'Not found user'
                        })
                    } else {
                        const token = jwt.sign({
                        id: account.ID
                        },  process.env.JWT_SECRET, {
                                expiresIn: process.env.JWT_EXPIRES_IN
                        })

                        console.log(token);
                        account.token = token
                        account.password = undefined
                        const options = {
                            expries: new Date(Date.now() + 3 * 24 * 60 * 60  * 1000),
                            httpOnly: true
                        }
                        res.status(200).cookie("token", token, options).json({
                            token,
                            username: account.username
                        })    
                    }
                }
            })
        } catch(error) {
            res.status(403).json({success: false, message: error.message})
        }
    }
}


module.exports = new Authen();