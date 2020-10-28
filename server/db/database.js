const mysql = require('mysql');
var pool = mysql.createPool({
    host: 'blh7gemxzxusiyohygpd-mysql.services.clever-cloud.com',
    user: 'uz5epjipcohizn2u',
    password: 'VOBTGvYw5QZl36y8OJrn',
    database: 'blh7gemxzxusiyohygpd',
    port: 3306
});

module.exports = pool; 



