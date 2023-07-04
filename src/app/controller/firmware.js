const {multitoObject,mongoosetoObject } = require('../../ultis/convert')
const db = require('../../config/database/index')
const multer = require('multer')
const upload = multer({storage: multer.memoryStorage(), dest: './public/uploads/'})
class Firmware {
    async getAllFirmware(req,res) {
        try {
            const sqlString = 'SELECT * FROM IoT.dbo.Firmware';
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
            res.status(404).json({
                success: false,  
                message: error
            })
        }
    }
    async createOneFirmware(req,res) {
        try {
            const { ID, Name, Data, Description } = req.body;
            console.log( req.body);
            let sqlString;
            if(Data == '' || Data == null) {
                sqlString  = `
                SET IDENTITY_INSERT IoT.dbo.Firmware ON;
                
                INSERT INTO IoT.dbo.Firmware(ID,Name,Data,LocalLink,Description,CreatedAt,UpdatedAt) VALUES (${Number.isInteger(Number(ID)) && Number(ID) > 0 ? Number(ID) : null},'${Name}',null,null,N'${Description}',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

                SET IDENTITY_INSERT IoT.dbo.Firmware OFF;
    
                `
            }else {
                sqlString  = `
                SET IDENTITY_INSERT IoT.dbo.Firmware ON;
    
                INSERT INTO IoT.dbo.Firmware(ID,Name,Data,LocalLink,Description,CreatedAt,UpdatedAt)
                VALUES (${Number.isInteger(Number(ID)) && Number(ID) > 0 ? Number(ID) : null},'${Name},'${null}',null,N'${Description}',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
    
                SET IDENTITY_INSERT  IoT.dbo.Firmware OFF;

                `
            }

            console.log(sqlString);
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
            console.log(ID);
            const sqlString = `DELETE FROM  IoT.dbo.Firmware WHERE ID = ${ID}`
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
            let sqlString = `DELETE FROM IoT.dbo.Firmware WHERE `
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
            const {ID,Name,Data,Description} = req.body
            let sqlString
            if(Data == '' || Data == null) {
                sqlString = `
                UPDATE  IoT.dbo.Firmware

                SET Name = N'${Name}', Data = NULL, Description = N'${Description}', UpdatedAt = CURRENT_TIMESTAMP
                WHERE ID = ${ID}
                `
            } else {
                sqlString = `
                    UPDATE  IoT.dbo.Firmware

                    SET Name = N'${Name}', Data = '${Data}', Description = N'${Description}', UpdatedAt = CURRENT_TIMESTAMP

                    WHERE ID = ${ID}`
            }
            const request = new db.sql.Request();

            request.query(sqlString, (err, data) => {
                if (err) {
                    res.status(403).json({
                        message: 'Can not'
                    })
                }
                res.status(202).json(data)
            })
        } catch(error) {
            res.status(403).json({
                success: false,
            })
        }
    }

    async uploadFile(req,res) {
        try {
            const path = req.file.path
            const ID = req.body.ID
            const fileData = req.file.buffer;
            console.log(fileData);
            let  sqlString =
            `UPDATE  IoT.dbo.Firmware
            SET LocalLink = N'${path}', UpdatedAt = CURRENT_TIMESTAMP
            WHERE ID = ${ID}`
            const request = new db.sql.Request()
            request.query(sqlString, (err,data) => {
                if(err) {
                    res.status(403).json(err)
                }
                res.status(201).json(data)
            })
        }catch(error) {
            res.status(403).json({
                success: false,
                error
            })
        }
    }
}


module.exports = new Firmware()