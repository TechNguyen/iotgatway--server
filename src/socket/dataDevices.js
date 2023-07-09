const db = require('../config/database/index')
const sqlString = 'SELECT * FROM IoT.dbo.Device';
const request = new db.sql.Request();
let data = [];
try {
    request.query(sqlString, (err, datadevices) => {
        if(err) {
            return err
        } else {
           data = [...datadevices.recordset]
           console.log(data);
        }
    });
} catch(error) {
    return error
}
module.exports = {data}