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
            const sqlString = `INSERT INTO DeviceDB.dbo.Device VALUES (${parseInt(ID)},'${Mac}','${Name}',${parseInt(ApplicationID)},'${Description}')`
            console.log(sqlString);
            const request = db.sql.Request();
            request.query(sqlString, (err,data) => {
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
                message: error
            })
        }
    }



    async deleteOneDevice(req,res) {
        try {
            const {ID} = req.body;
            console.log(ID);
            const sqlString = `DELETE FROM DeviceDB.dbo.Device WHERE ID = ${parseInt(ID)}`
        } catch(error) {

        }
    } 

}


module.exports = new Device()