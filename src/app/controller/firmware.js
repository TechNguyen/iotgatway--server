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
            const { ID, Name, Data, locallink, Description } = req.body;
            let sqlString
            if(Data == null) {
                sqlString  = `
                SET IDENTITY_INSERT  DeviceDB.dbo.Firmware ON;
    
                INSERT INTO DeviceDB.dbo.Firmware (ID, Name,Data, LocalLink, Description, CreatedAt, UpdatedAt)
                VALUES ( ${parseInt(ID)},'${Name}', ${Data},'${locallink}','${Description}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    
                SET IDENTITY_INSERT  DeviceDB.dbo.Firmware OFF;
    
                `
            }else {
                sqlString  = `
                SET IDENTITY_INSERT  DeviceDB.dbo.Firmware ON;
    
                INSERT INTO DeviceDB.dbo.Firmware (ID, Name,Data, LocalLink, Description, CreatedAt, UpdatedAt)
                VALUES ( ${parseInt(ID)},'${Name}', '${Data}','${locallink}','${Description}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    
                SET IDENTITY_INSERT  DeviceDB.dbo.Firmware OFF;
    
                `
            }
            const request = new db.sql.Request();
            request.query(sqlString, (err,data) => {
                if(err) {
                    res.status(402).json({
                        success: false,
                        err
                    })
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
            const {ID,Name,Data,LocalLink,Description} = req.body
            console.log({ID,Name,Data,LocalLink,Description})
            let sqlString
            if(Data == null) {
                sqlString = `
                UPDATE  DeviceDB.dbo.Firmware

                SET Name = '${Name}', Data = NULL, LocalLink='${LocalLink}', Description = N'${Description}', UpdatedAt = CURRENT_TIMESTAMP
                WHERE ID = ${ID}
                `
            } else {
                sqlString = `
                    UPDATE  DeviceDB.dbo.Firmware

                    SET Name = '${Name}', Data = '${Data}', LocalLink='${LocalLink}', Description = N'${Description}', UpdatedAt = CURRENT_TIMESTAMP

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