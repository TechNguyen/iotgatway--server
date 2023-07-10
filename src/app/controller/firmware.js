const {multitoObject,mongoosetoObject } = require('../../ultis/convert')
const db = require('../../config/database/index')
const fs = require('fs')
class Firmware {
    async getAllFirmware(req,res) {
        try {
            const curent = req.query.curent
            const pageSize = req.query.pageSize
            // const sqlString = `
            // SELECT ID,Name,LocalLink,Description,CreatedAt,UpdatedAt
            // FROM (
            //     SELECT ROW_NUMBER() OVER (ORDER BY ID) AS RowNumber, *
            //     FROM IoT.dbo.Firmware
            // ) AS t
            // WHERE RowNumber BETWEEN (${parseInt(curent)} - 1) * ${parseInt(pageSize)} + 1 AND ${parseInt(curent)} * ${parseInt(pageSize)}`;
            const  sqlString = `
            SELECT ID,Name,LocalLink,Description,CreatedAt,UpdatedAt FROM IoT.dbo.Firmware
            `
            const request = new db.sql.Request();
            request.query(sqlString, (err, data) => {
                if(err) {
                    res.status(403).json({
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
            const { ID, Name, Description } = req.body;
            let sqlString  = `
                SET IDENTITY_INSERT IoT.dbo.Firmware ON;
    
                INSERT INTO IoT.dbo.Firmware(ID,Name,LocalLink,Description,CreatedAt,UpdatedAt,DataID)
                VALUES (${Number.isInteger(Number(ID)) && Number(ID) > 0 ? Number(ID) : null},N'${Name}',null,N'${Description}',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,null);
    
                SET IDENTITY_INSERT  IoT.dbo.Firmware OFF;

                `

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
            const sqlString = `
            DELETE FROM IoT.dbo.fileFirm Where ID = ${ID}
            `
            const request = new db.sql.Request();
            request.query(sqlString, (err, data) => {
                if (err) {
                    res.status(403).json(err)
                }else {
                    const sqlStringDelteFirm =  `DELETE FROM  IoT.dbo.Firmware WHERE ID = ${ID}`
                    request.query(sqlStringDelteFirm, (err,data) => {
                        if(err) {
                            res.status(403).json({
                                message: 'Error'
                            })
                        } else {
                            res.status(200).json(data)
                        }
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
                else {           
                    let sqlStringData = `DELETE FROM IoT.dbo.fileFirm WHERE `
                    for(let i = 0; i < selectedRowKeys.length; i++) {
                        if(i == selectedRowKeys.length - 1) {
                            sqlStringData += `ID = ${selectedRowKeys[i]}`
                        } else {
                            sqlStringData += `ID = ${selectedRowKeys[i]} OR `
                        }
                    }
                    request.query(sqlStringData, (err,data) => {
                        if (err) {
                            res.status(403).json(err)
                        }
                        res.status(200).json(data)
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



    async updateFirmware(req,res) {
        try {
            const {ID,Name,Description} = req.body

            let sqlString = `
                UPDATE  IoT.dbo.Firmware

                SET Name = N'${Name}',Description = N'${Description}', UpdatedAt = CURRENT_TIMESTAMP
                WHERE ID = ${ID}
                `

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
            const content = fs.readFileSync(path)
            const varbinary = Buffer.from(content, req.file.encoding);
            const request = new db.sql.Request()

            let checkFirm = `
            SELECT COUNT(*) as countFile FROM IoT.dbo.fileFirm Where ID = ${Number.isInteger(Number(ID)) && Number(ID) > 0 ? Number(ID) : null}
            `
            request.query(checkFirm, (err,data) => {
                if(err) {
                    res.status(400).json({
                        message: err
                    })
                }
                else {
                    const file = data.recordset[0]
                    let sqlStringToFile
                    if(file.countFile == 0) {
                        sqlStringToFile = `
                        INSERT INTO IoT.dbo.fileFirm (ID,data) VALUES (${Number.isInteger(Number(ID)) && Number(ID) > 0 ? Number(ID) : null}, 0x${varbinary.toString('hex')}, '${path}')
                        `
                    } else {
                        sqlStringToFile = `
                        UPDATE IoT.dbo.fileFirm
                        SET data = 0x${varbinary.toString('hex')},path = '${path}'
                        where ID = ${Number(ID)}
                        `
                    }
                    request.query(sqlStringToFile, (err,data) => {
                        if(err) {
                            res.status(404).json({
                                message: 'Do not save your file'
                            })
                        } else {
                            let  sqlString =
                            `UPDATE  IoT.dbo.Firmware
                            SET DataID = ${Number.isInteger(Number(ID)) && Number(ID) > 0 ? Number(ID) : null},LocalLink = N'${path}',UpdatedAt = CURRENT_TIMESTAMP
                            WHERE ID = ${Number(ID)}`
                            request.query(sqlString, (err,data) => {
                                if(err) {
                                    res.status(403).json({
                                        message: 'Error save your file!'
                                    })
                                }
                                res.status(201).json(data)
                            })
                        }
                    })
                }
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