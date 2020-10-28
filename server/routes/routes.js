const poolConnection = require('../db/database');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');


// DECLARE JWT-secret
const JWT_Secret = 'sumamentesecreta';

router.get('/', (req, res) => {
    poolConnection.getConnection((err, connection) => {
        connection.query('SELECT correo, contrasena FROM blh7gemxzxusiyohygpd.Propietario', (err, rows, fields) => {
            if (!err) {
                res.json(rows);
            } else {
                console.log(err);
            }
            connection.release();
        });
    })
});

router.post('/login', (req, res) => {
    poolConnection.getConnection((err, connection) => {
        connection.query('SELECT correo, contrasena FROM blh7gemxzxusiyohygpd.Propietario', (err, rows, fields) => {
            let usuario = req.body; 
            let existe = false; 
            for (let row of rows){
                if(usuario.correo === row.correo && usuario.contrasena === row.contrasena){
                    var token =  jwt.sign(usuario, JWT_Secret); 
                    existe = true; 
                    break; 
                }
            } 
            if(existe){
                res.json({
                    existe: existe,
                    token: token
                })
            }else{
                res.json({
                    existe: existe,
                    mensaje: 'No existe en la bd'
                }); 
            }
              
            connection.release();
        });
    })
});

module.exports = router;







