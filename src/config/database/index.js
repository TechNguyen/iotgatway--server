const sql = require("mssql/msnodesqlv8");
const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    server: process.env.DB_SERVER,
    driver: "msnodesqlv8",
}
async function connect() {
    try {
       await sql.connect(sqlConfig);
    }catch(error) {
        process.exit(1);
    }
}
module.exports = {
    connect,
    sqlConfig,
    sql
}