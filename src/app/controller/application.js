const {multitoObject,mongoosetoObject } = require('../../ultis/convert')
const db = require('../../config/database/index')
class Application {
    async getAllApplication(req,res) {
        try {
            const sqlString = 'SELECT * FROM DeviceDB.dbo.Application';
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
    async createOneApplication(req,res) {
        try {
            const  {ID,Name,FirmID, Version, Descxription} = req.body
            const sqlString = `INSERT INTO DeviceDB.dbo.Application VALUES(${parseInt(ID)},'${Name}',${parseInt(FirmID)},${parseInt(Version)},'${Description}')`
            const request = db.sql.Request();
            console.log(sqlString);
            request.query(sqlStringCheckAppli, (err,data) => {
                if(err) {
                    res.status(403).json({
                        success: false,
                        message: err
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
            const sqlString = `DELETE FROM DeviceDB.dbo.Application WHERE ID = ${parseInt(ID)}`
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
            let sqlString = `DELETE FROM DeviceDB.dbo.Application WHERE `
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
            let sqlString
            if(FirmID) {
                sqlString = `
                UPDATE  DeviceDB.dbo.Application
    
                SET Name = N'${Name}',Version = ${parseInt(Version)}, Description = N'${Description}', UpdatedAt = CURRENT_TIMESTAMP
    
                WHERE ID = ${ID}`
            } else {
                sqlString = `
                UPDATE DeviceDB.dbo.Application
    
                SET Name = N'${Name}',Version = ${parseInt(Version)}, Description = N'${Description}', UpdatedAt = CURRENT_TIMESTAMP
    
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

    async uploadFile(req,res) {
        try {
            console.log(req.file)
        } catch(error){

        }
    }
}


module.exports = new Application()