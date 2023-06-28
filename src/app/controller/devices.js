const {multitoObject,mongoosetoObject } = require('../../ultis/convert')
const db = require('../../config/database/index')
class Device {
    async getAllDevices(req,res) {
        try {
            const sqlString = 'SELECT * FROM DeviceDB.dbo.Device';
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
            const { ID, Mac, Name, Description, ApplicationID } = req.body;
            console.log({ ID, Mac, Name, Description, ApplicationID });
            // const sqlString = `INSERT INTO DeviceDB.dbo.Device VALUES(${ID},${Mac},${Name},${ApplicationID},${Description})`
            // const request = db.sql.Request();
            // request.query(sqlString, (err,data) => {
            //     if(err) {
            //         res.status(403).json({
            //             success: false,
            //             message: err
            //         })
            //     }
            //     res.status(200).json(data.recordset)
            // })
        } catch(error) {
            res.status(403).json({
                success: false,
                message: error
            })
        }
    }

}


module.exports = new Device()