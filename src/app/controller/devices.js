const {multitoObject,mongoosetoObject } = require('../../ultis/convert')
const db = require('../../config/database/index');
const { Numeric } = require('mssql');
class Device {
    async getAllDevices(req,res) {
        try {
            const sqlString = 'SELECT * FROM IoT.dbo.Device';
            const request = new db.sql.Request();
            request.query(sqlString, (err, datadevices) => {
                if(err) {
                    res.status(403).json({
                        success: false,
                        message: err
                    })
                }
                res.status(201).json(datadevices.recordset)
            });
        } catch(error) {
            res.status(403).json({
                success: false,
                message: error
            })
        }
    }
    async createOneDevices(req,res) {
        try {
            const {  ID, Mac, LocalIp, Name, ApplicationID, ODO, Description, StatusID} = req.body;
            console.log({ ID, Mac, LocalIp, Name, ApplicationID, ODO, Description, StatusID});
            const sqlString =  `    
            SET IDENTITY_INSERT IoT.dbo.Device ON;

            INSERT INTO IoT.dbo.Device (ID, MAC, LocalIp, Name, AppID, ODO, Description,StatusID,CreatedTime, UpdateTime)
            VALUES (${Number.isInteger(Number(ID)) && Number(ID) > 0 ? Number(ID) : null},'${Mac}','${LocalIp}',N'${Name}',${Number.isInteger(Number(ApplicationID)) && Number(ApplicationID) > 0 ? Number(ApplicationID) : null},${Number.isInteger(Number(ODO)) && Number(ODO) > 0 ? Number(ODO) : null},N'${Description}',${Number.isInteger(Number(StatusID)) && Number(StatusID) > 0 ? Number(StatusID) : null},CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

            SET IDENTITY_INSERT IoT.dbo.Device OFF;

            `   

            console.log(sqlString);
            const request = new db.sql.Request();
            request.query(sqlString, (err,data) => {
                if(err) {
                    res.status(404).json({
                        message: 'Not found Application or Status. You must create Application or Status before'
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

    async deleteOneDevice(req,res) {
        try {
            const {ID} = req.body;
            const sqlString = `DELETE FROM IoT.dbo.Device WHERE ID = ${parseInt(ID)}`
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

    async deleteManyDevices(req,res) {
        try {
            const selectedRowKeys = req.body;
            let sqlString = `DELETE FROM IoT.dbo.Device WHERE `
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



    async updateDevices(req,res) {
        try {
            const {ID,Mac,LocalIp, Name, ApplicationID,Description,ODO,StatusID} = req.body
            let sqlString  = `
                UPDATE IoT.dbo.Device
    
                SET MAC = N'${Mac}',LocalIp = N'${LocalIp}',Name = N'${Name}', AppID = ${(Number.isInteger(Number(ApplicationID)) && Number(ApplicationID) != 0 ) ? Number(ApplicationID) : null} , ODO = ${(Number.isInteger(Number(ODO)) && Number(ODO) != 0) ? Number(ODO) : null}, Description = N'${Description}', StatusID= ${(Number.isInteger(Number(StatusID)) && Number(StatusID) != 0) ? Number(StatusID) : null}, UpdateTime = CURRENT_TIMESTAMP
    
                WHERE ID = ${ID}`
            const request = new db.sql.Request();
            request.query(sqlString, (err, data) => {
                if (err) {
                    res.status(400).json({
                        message: 'Not found Application or Status'
                    })
                }
                res.status(202).json(data)
            })
        } catch(error) {
            res.status(404).json({
                success: false,
            })
        }
    }

}


module.exports = new Device()