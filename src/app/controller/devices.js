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
            const { ID, Mac, Name, ApplicationID, Description } = req.body;
            const sqlStringCheckAppli = `Select count(*) as countApp from DeviceDB.dbo.Application where ID = ${parseInt(ApplicationID)}`   
          
            // const sqlString = `CREATE TRIGGER 'DEVICE'AFTER INSERT ON 'DeviceDB.dbo.Device' FOR EACH ROW
            // BEGIN 
            // UPDATE 'DeviceDB.dbo.Device' SET 
            //  INSERT INTO DeviceDB.dbo.Device VALUES (${parseInt(ID)},'${Mac}','${Name}',${parseInt(ApplicationID)},'${Description}')`
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
                        
                        SET IDENTITY_INSERT DeviceDB.dbo.Device ON;

                        INSERT INTO DeviceDB.dbo.Device (ID, MAC, Name, AppID, Description, CreatedTime, UpdatedAt)
                        VALUES ( ${parseInt(ID)},'${Mac}','${Name}',${parseInt(ApplicationID)},'${Description}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

                        SET IDENTITY_INSERT DeviceDB.dbo.Device OFF;
                        `
                    } else {
                        sqlString  = `
                        
                        SET IDENTITY_INSERT DeviceDB.dbo.Device ON;

               

                        INSERT INTO DeviceDB.dbo.Device (ID, MAC, Name, AppID, Description, CreatedTime, UpdatedAt)
                        VALUES ( ${parseInt(ID)},'${Mac}','${Name}', NULL ,'${Description}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

                  
                        SET IDENTITY_INSERT DeviceDB.dbo.Device OFF;
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



    async deleteOneDevice(req,res) {
        try {
            const {ID} = req.body;
            console.log(ID);
            const sqlString = `DELETE FROM DeviceDB.dbo.Device WHERE ID = ${parseInt(ID)}`
            const request = db.sql.Request();
            request.query(sqlString, (err) => {
                if (err) {
                    res.status(403).json(err)
                }
            })
        } catch(error) {

        }
    } 

}


module.exports = new Device()