const mysql = require('mysql2/promise');
const fs = require('fs');


const pool = mysql.createPool({
    host: 'mysql-prod-db.mysql.database.azure.com',
    user: 'tekhnologia',
    password: 'Royal@1985',
    database: 'hms_prod',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    // timezone: 'local'
    ssl: {
        ca: fs.readFileSync('C:/Users/Tekhnologia/Desktop/hms_uat_28_7/hms_backend/ssl/DigiCertGlobalRootCA.crt.pem'),
        rejectUnauthorized: false
      }
});

 
// Test the connection when the application starts
(async () => {
    try {
        const connection = await pool.getConnection();
        connection.release();
    } catch (err) {
        console.error('Database connection failed:', err.message);
    }
})();
 
const query = async (sql, values) => {
    try {
        const [results, ] = await pool.query(sql, values);
        return results;
    } catch (err) {
        throw err;
    }
};
 
module.exports = { query, pool };
 