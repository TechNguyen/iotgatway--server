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


    async deleteoneDevice(req,res) {
        try {

        }catch(error) {

        }
    }

}


module.exports = new Application()