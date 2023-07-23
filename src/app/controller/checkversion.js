const express = require('express')
const db = require('../../config/database/index')
const jwt = require('jsonwebtoken')
class iotcheckversion{
    async checkversion(req,res) {
        try {
            const fid = req.body.fwid
            const MAC = req.body.mac
            const sqlString = `EXEC IoT.dbo.sp_fwCheck '${MAC}', ${parseInt(fid)}`
            const request = new db.sql.Request()

            console.log(sqlString);
            request.query(sqlString, (err, data) => {
                if(err) {
                    res.status(400).json({
                        err
                    })
                } else {
                    const checknew = data.recordset[0].Message == 'new firmware'
                    console.log(checknew);
                    const dataIdFile = parseInt(fid);
                    const token = jwt.sign({dataIdFile}, process.env.JWT_SECRET, {
                        expiresIn: '3m'
                    })


                    res.status(200).json({
                        code : 200,
                        message: 'Successfullly!',
                         data: {
                            new: checknew,
                            url: `${process.env.URL}/v1/api/firmware/file?token=${token}`
                        }
                    });
                }
            })
        } catch(error) {
            res.status(404).json({
                code: 404,
                message: 'Server error'
            })
        }
    }
}


module.exports =  new iotcheckversion()