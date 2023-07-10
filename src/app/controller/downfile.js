const express = require('express')
const db = require('../../config/database/index')
const path = require('path')
const fs = require('fs')
const http = require('http')
const appRoot = require('app-root-path')
class downfile{
    async file(req,res) {
        try {
            const id = req.params.id
            const sqlString = `Select path from IoT.dbo.fileFirm where ID = ${parseInt(id)}`
            const request = new db.sql.Request()
            request.query(sqlString, (err,data) => {
                if(err){
                    res.status(404).json({
                        message: 'Bad request'
                    })
                }else {
                    const pathfile = data.recordset[0].path
                    const filePath = appRoot.path +'\\' + path.join(pathfile);
                    const stat = fs.statSync(filePath)
                    res.writeHead(200, {
                        'Content-Type': 'application/octet-stream',
                        'Content-Length': stat.size,
                        'Content-Disposition': 'attachment'
                    })
                    const readStream = fs.createReadStream(filePath)
                    readStream.pipe(res)
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


module.exports =  new downfile()