const {multitoObject,mongoosetoObject } = require('../../ultis/convert')
const db = require('../../config/database/index')
class Firmware {
    async getAllFirmware(req,res) {
        try {
            const sqlString = 'SELECT * FROM DeviceDB.dbo.Firmware';
            const request = new db.sql.Request();
            request.query(sqlString, (err, data) => {
                if(err) {
                    res.status(403).json({
                        success: false,
                        message: err
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
    async createOneFirmware(req,res) {
        try {
            const { ID, Mac, Name, ApplicationID, Description } = req.body;
            const sqlStringCheckAppli = `Select count(*) as countApp from  DeviceDB.dbo.Firmware where ID = ${parseInt(ApplicationID)}`   
            const request = new db.sql.Request();
            request.query(sqlStringCheckAppli, (err,data) => {
                if(err) {
                    res.status(404).json({
                        success: false,
                        err
                    })
                } else if(data) {
                    let sqlString
                    if(data.recordset[0].countApp >= 1) {
                        sqlString  = `
                        
                        SET IDENTITY_INSERT  DeviceDB.dbo.Firmware ON;

                        INSERT INTO DeviceDB.dbo.Device (ID, MAC, Name, AppID, Description, CreatedTime, UpdatedAt)
                        VALUES ( ${parseInt(ID)},'${Mac}','${Name}',${parseInt(ApplicationID)},'${Description}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

                        SET IDENTITY_INSERT  DeviceDB.dbo.Firmware OFF;
                        `
                    } else {
                        sqlString  = `
                        
                        SET IDENTITY_INSERT  DeviceDB.dbo.Firmware ON;

                        INSERT INTO DeviceDB.dbo.Device (ID, MAC, Name, AppID, Description, CreatedTime, UpdatedAt)
                        VALUES ( ${parseInt(ID)},'${Mac}','${Name}', NULL ,'${Description}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

                  
                        SET IDENTITY_INSERT  DeviceDB.dbo.Firmware OFF;
                        `
                    }
                    request.query(sqlString, (err,data) => {
                        if(err) {
                            res.status(402).json({
                                success: false,
                                err
                            })
                        }
                        res.status(202).json(data)
                    })
                }
            })
        } catch(error) {
            res.status(403).json({
                success: false,
                error
            })
        }
    }

    async deleteOneFirmware(req,res) {
        try {
            const {ID} = req.body;
            const sqlString = `DELETE FROM  DeviceDB.dbo.Firmware WHERE ID = ${parseInt(ID)}`
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

    async deleteManyFirmware(req,res) {
        try {
            const selectedRowKeys = req.body;
            let sqlString = `DELETE FROM  DeviceDB.dbo.Firmware WHERE `
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



    async updateFirmware(req,res) {
        try {
            const {ID,Mac,Name,ApplicationID,Description} = req.body
            console.log(ID,Mac,Name,ApplicationID,Description)
            let sqlString
            if(ApplicationID) {
                sqlString = `
                UPDATE  DeviceDB.dbo.Firmware
    
                SET MAC = '${Mac}',Name = '${Name}',AppID = ${parseInt(ApplicationID)}, Description = '${Description}', UpdatedAt = CURRENT_TIMESTAMP
    
                WHERE ID = ${ID}`
            } else {
                sqlString = `
                UPDATE DeviceDB.dbo.Device
    
                SET MAC = '${Mac}',Name = '${Name}',AppID = NULL, Description = '${Description}', UpdatedAt = CURRENT_TIMESTAMP
    
                WHERE ID = ${ID}`
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
            })
        }
    }


}


module.exports = new Firmware()