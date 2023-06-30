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
 
            // const sqlString = `INSERT INTO DeviceDB.dbo.Device VALUES(${ID},${Mac},${Name},${ApplicationID},${Description})`
            const request = db.sql.Request();
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
            const {ID,Mac,Name,ApplicationID,Description} = req.body
            console.log(ID,Mac,Name,ApplicationID,Description)
            let sqlString
            if(ApplicationID) {
                sqlString = `
                UPDATE  DeviceDB.dbo.Application
    
                SET MAC = '${Mac}',Name = '${Name}',AppID = ${parseInt(ApplicationID)}, Description = '${Description}', UpdatedAt = CURRENT_TIMESTAMP
    
                WHERE ID = ${ID}`
            } else {
                sqlString = `
                UPDATE DeviceDB.dbo.Application
    
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


module.exports = new Application()