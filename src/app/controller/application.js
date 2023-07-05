const {multitoObject,mongoosetoObject } = require('../../ultis/convert')
const db = require('../../config/database/index')
class Application {
    async getAllApplication(req,res) {
        try {
            const sqlString = 'SELECT * FROM IoT.dbo.Application';
            const request = new db.sql.Request();
            request.query(sqlString, (err, data) => {
                if(err) {
                    res.status(403).json({
                        message: 'Not found Application from server'
                    })
                }
                res.status(201).json(data.recordset)
            });
        } catch(error) {
            res.status(403).json({
                success: false,
                message: error
            })
        }
    }
    async createOneApplication(req,res) {
        try {
            const  {ID,Name,FirmID, Version, Description} = req.body
            let sqlString = `

            SET IDENTITY_INSERT IoT.dbo.Application ON;

            INSERT INTO IoT.dbo.Application (ID,NAME,FirmwareID,Version,Description,CreatedTime,UpdateTime) VALUES(${Number.isInteger(Number(ID)) && Number(ID) > 0 ? Number(ID) : null},N'${Name}',${Number.isInteger(Number(FirmID)) && Number(FirmID) > 0 ? Number(FirmID) : null},${Number.isInteger(Number(Version)) && Number(Version) > 0 ? Number(Version) : null},N'${Description}',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
    
            SET IDENTITY_INSERT IoT.dbo.Application OFF;  

            `
            const request = new db.sql.Request();
            request.query(sqlString, (err,data) => {
                if(err) {
                    res.status(403).json({
                        message: 'Not found Firmware. You must create Firmware before'
                    })
                }
                res.status(200).json(data)
            })
        } catch(error) {
            res.status(403).json({
                success: false,
                error
            })
        }
    }

    async deleteOneApplication(req,res) {
        try {
            const {ID} = req.body;
            const sqlString = `DELETE FROM IoT.dbo.Application WHERE ID = ${parseInt(ID)}`

            const request = new db.sql.Request();
            request.query(sqlString, (err, data) => {
                if (err) {
                    res.status(403).json(err)
                }
                res.status(202).json(data)
            })
        } catch(error) {
            res.status(403).json({
                success: false,
                error
            })
        }
    } 

    async deleteManyApplications(req,res) {
        try {
            const selectedRowKeys = req.body;
            let sqlString = `DELETE FROM IoT.dbo.Application WHERE `
            for(let i = 0; i < selectedRowKeys.length; i++) {
                if(i == selectedRowKeys.length - 1) {
                    sqlString += `ID = ${selectedRowKeys[i]}`
                } else {
                    sqlString += `ID = ${selectedRowKeys[i]} OR `
                }

            }
            const request = new db.sql.Request();
            request.query(sqlString, (err, data) => {
                if (err) {
                    res.status(403).json(err)
                }
                res.status(202).json(data)
            })
        } catch(error) {
            res.status(403).json({
                success: false,
                error
            })
        }
    } 



    async updateApplication(req,res) {
        try {
            const {ID, Name, FirmID, Version ,Description} = req.body
            let sqlString = `
            UPDATE IoT.dbo.Application

            SET Name = N'${Name}', FirmwareID = ${Number.isInteger(Number(FirmID)) && Number(FirmID) > 0 ? Number(FirmID) : null},Version = ${Number.isInteger(Number(Version)) && Number(Version) > 0 ? Number(Version) : null},Description = N'${Description}', UpdateTime = CURRENT_TIMESTAMP

            WHERE ID = ${ID}`


            const request = new db.sql.Request();
            request.query(sqlString, (err, data) => {
                if (err) {
                    res.status(403).json(err)
                }
                res.status(202).json(data)
            })
        } catch(error) {
            res.status(403).json({
                success: false,
            })
        }
    }
}


module.exports = new Application()