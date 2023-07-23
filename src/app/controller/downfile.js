const express = require('express')
const db = require('../../config/database/index')
const path = require('path')
const fs = require('fs')
const http = require('http')
const appRoot = require('app-root-path')
const jwt = require('jsonwebtoken')
class downfile{
    async file(req,res) {
        try {
            const token = req.query.token;
            const tokenCheck = jwt.verify(token, process.env.JWT_SECRET)
            if(tokenCheck) {
                const tokenCheck = jwt.verify(req.query.token, process.env.JWT_SECRET)
                const tokenTimeout = tokenCheck.exp * 1000
                const now = new Date();
                if(now.getTime() > tokenTimeout) {
                    console.log('timeout');
                    res.status(401).json({
                        message: 'Token is timeout'
                    })
                 } else {
                    const id = tokenCheck.dataIdFile
                    const sqlString = `Select path from IoT.dbo.fileFirm where ID = ${parseInt(id)}`
                    const request = new db.sql.Request()
                    request.query(sqlString, (err,data) => {
                        if(err){
                            res.status(404).json(err)
                        } else {
                            const pathfile = data.recordset[0].path
                            const filename = pathfile.slice(17)
                            const filePath = path.join(appRoot.path, pathfile);
                            fs.stat(filePath, (err , stats) => {
                                if(err) {
                                    res.status(400).json({
                                        err
                                    })
                                }
                                res.setHeader('Content-Length', stats.size);
                                res.setHeader('Content-Type', 'application/octet-stream');
                                res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
                                const stream = fs.createReadStream(filePath)
                                stream.pipe(res);
                                res.status(200).json({
                                    code: 201,
                                    message: "Success download file"
                                })
                            })
                        }}
                    )
                 }
            }
        } catch(error) {
            res.status(404).json({
                code: 404,
                message: 'Server error'
            })
        }
    }
}


module.exports =  new downfile()