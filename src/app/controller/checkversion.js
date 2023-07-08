const express = require('express')
const db = require('../../config/database/index')
class iotcheckversion{
    async checkversion(req,res) {
        try {
            const fid = req.body.fwid
            const MAC = req.body.mac
            const sqlString = `EXEC IoT.dbo.sp_fwCheck '${MAC}', ${parseInt(fid)}`
            const request = new db.sql.Request();
            request.query(sqlString, (err,data) => {
                if(err) {
                    res.status(400).json({
                        code: 400,
                        message: 'Bad Request'
                    })
                } else{
                    res.status(200).json({
                        code : 200,
                        message: 'Successfullly!',
                         data: {
                            new: data.recordset[0].Message == 'new firmware' ? false : true,
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