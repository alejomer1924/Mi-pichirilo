const poolConnection = require('../db/database');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../db/database');
const nodemailer = require("nodemailer");



// DECLARE JWT-secret
const JWT_Secret = 'sumamentesecreta';

router.get('/', (req, res) => {
    /* poolConnection.getConnection((err, connection) => {
        connection.query('SELECT correo, contrasena FROM blh7gemxzxusiyohygpd.Propietario', (err, rows, fields) => {
            if (!err) {
                res.json(rows);
            } else {
                console.log(err);
            }
            connection.release();
        });
    }) */
    sendEmail('jposadasepulveda@gmail.com, burbano444@gmail.com', 'que viva la arepa');
});

router.post('/login', (req, res) => {
    poolConnection.getConnection((err, connection) => {
        let usuario = req.body;
        let rolBD = usuario.rol;
        let id = "";
        if (rolBD == 'Empleado') {
            id = 'id_empleado';
        } else {
            id = 'id_propietario';
        }
        connection.query(`SELECT ${id} AS id, correo, contrasena FROM blh7gemxzxusiyohygpd.${rolBD}`, async (err, rows, fields) => {
            let existe = false;
            let token;
            for (let row of rows) {
                if (usuario.correo === row.correo) {
                    console.log('entra, correo existente');
                    await bcrypt.compare(usuario.contrasena, row.contrasena).then(same => {
                        if (same === true) {
                            console.log('entra, contraseña correcta');
                            token = jwt.sign({ id: row.id }, JWT_Secret, { expiresIn: '8h' });
                            existe = true;
                        }
                    });
                }
                if (existe) {
                    break;
                }
            }
            console.log(existe);
            if (existe) {
                console.log('asdasdsadadsadas');
                res.json({
                    existe: existe,
                    token: token
                })
            } else {
                res.json({
                    existe: existe,
                    mensaje: 'No existe en la bd'
                });
            }
            connection.release();
        });
    })
});


router.post('/agregarPropietario', async (req, res) => {
    let propietario = req.body;
    let encryptedPassword;
    await bcrypt.hash(propietario.contrasena, 10).then((hash) => {
        encryptedPassword = hash;
    });

    /* bcrypt.compare('manu123', encryptedPassword, (err, same) => {
        console.log(same);
    }); */

    poolConnection.getConnection((err, connection) => {
        connection.query('INSERT INTO blh7gemxzxusiyohygpd.Propietario (id_propietario, nombre, celular, correo, contrasena, Estado_id_estado) VALUES (?,?,?,?,?,?)',
            [propietario.id_propietario, propietario.nombre, propietario.celular, propietario.correo, encryptedPassword, 1], (err, result) => {
                if (err) {
                    console.log(err);
                    res.json({
                        ERROR: err
                    });
                } else {
                    res.json({
                        mensaje: 'Agregado exitosamente'
                    });
                }
            });
        connection.release();
    });

});

let verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send('Unthorize Request');
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
        const payload = jwt.verify(token, JWT_Secret);
        /* console.log(payload); */
        req.id = payload.id;
        next();
    } catch (JsonWebTokenError) {
        res.send('Invalid token');
    }
}

router.post('/registrarRep', verifyToken, async (req, res) => {
    let { vehiculo } = req.body;
    let { reparacion } = req.body;
    let {propietario} = req.body;
    console.log(vehiculo, reparacion, req.id);
    await addVehicle(vehiculo);
    let idRep = await addRepair(vehiculo.matricula, reparacion);
    await addRepXVeh(idRep, req.id);
    await addPropXVeh(vehiculo.matricula,propietario.id); 
    console.log('Se debe mostrar después de agregar todo perro');
    res.json({
        mensaje: 'Agregado exitosamente'
    });
});

const addVehicle = (vehiculo) => {
    return new Promise((resolve, reject) => {
        poolConnection.getConnection((err, connection) => {
            connection.query('INSERT INTO blh7gemxzxusiyohygpd.Vehiculo (matricula, descripcion, tipoV_id_tipoVehiculo, Estado_id_estado, marca, modelo, color, kilometraje) VALUES (?,?,?,?,?,?,?,?)',
                [vehiculo.matricula, vehiculo.descripcion, vehiculo.tipo, 1, vehiculo.marca, vehiculo.modelo, vehiculo.color, vehiculo.kilometraje], (err, results) => {
                    if (err) {
                        connection.release();
                        throw new Error(err);
                    } else {
                        connection.release();
                        console.log('agregado vehiculo prros')
                        resolve();
                    }
                });
        });
    });
}
const addRepair = (vMatricula, reparacion) => {
    return new Promise((resolve, reject) => {
        poolConnection.getConnection((err, connection) => {
            connection.query('INSERT INTO blh7gemxzxusiyohygpd.Reparacion (Vehiculo_matricula, fecha_llegada, fecha_salida, motivo, detalle, Estado_id_estado) VALUES (?,?,?,?,?,?)',
                [vMatricula, reparacion.fechaIngr, reparacion.fechaSal, reparacion.motivo, reparacion.detalles, 1], (err, results) => {
                    if (err) {
                        connection.release();
                        throw new Error(err);
                    } else {
                        connection.release();
                        console.log('Agregado reparacion prros');
                        resolve(results.insertId);
                    }
                });
        });
    });
}

const addRepXVeh = (idRep, idEmpl) => {
    return new Promise((resolve, reject) => {
        poolConnection.getConnection((err, connection) => {
            connection.query('INSERT INTO blh7gemxzxusiyohygpd.ReparacionXEmpleado (Reparacion_id_reparacion, Empleado_id_empleado) VALUES (?,?)',
                [idRep, idEmpl], (err, results) => {
                    if (err) {
                        connection.release();
                        throw new Error(err);
                    } else {
                        connection.release();
                        console.log('agregado reparacion x empleado prros')
                        resolve();
                    }
                });
        });
    });
}

const addPropXVeh = (idVeh, idProp) => {
    return new Promise((resolve, reject) => {
        poolConnection.getConnection((err, connection) => {
            connection.query('INSERT INTO blh7gemxzxusiyohygpd.VehiculoXPropietario (veh_matricula, prop_id_propietario) VALUES (?,?)',
                [idVeh, idProp], (err, results) => {
                    if (err) {
                        connection.release();
                        throw new Error(err);
                    } else {
                        connection.release();
                        console.log('agregado vehiculo x propietario prros')
                        resolve();
                    }
                });
        });
    });
}

router.get('/usuarios', verifyToken, (req, res) => {
    poolConnection.getConnection((err, connection) => {
        connection.query('SELECT * FROM blh7gemxzxusiyohygpd.Propietario', (err, rows, fields) => {
            if (!err) {
                res.json({
                    usuario: req.id,
                    items: rows
                });
            } else {
                res.json('Database ERROR', err);
            }
        })
    });
});

router.get('/reparaciones/:rol', verifyToken, (req, res) => {
    let {rol} = req.params; 
    console.log(rol); 
    if(rol == 'Empleado'){
        poolConnection.getConnection((err, connection) => {
            connection.query(`SELECT r.id_reparacion, Vehiculo_matricula, fecha_llegada, motivo, est.nombre FROM blh7gemxzxusiyohygpd.Empleado AS e INNER JOIN blh7gemxzxusiyohygpd.ReparacionXEmpleado rxe ON e.id_empleado = rxe.Empleado_id_empleado INNER JOIN blh7gemxzxusiyohygpd.Reparacion AS r ON rxe.Reparacion_id_reparacion = r.id_reparacion INNER JOIN blh7gemxzxusiyohygpd.Estado as est ON r.Estado_id_estado = est.id_estado  WHERE e.id_empleado = ${req.id}`, (err, rows, fields) => {
                if (!err) {
                    res.json({
                        usuario: req.id,
                        items: rows
                    });
                } else {
                    res.json('Database ERROR', err);
                }
                connection.release();
            });
        }); 
    }else{
        poolConnection.getConnection((err, connection) => {
            connection.query(`SELECT r.Vehiculo_matricula, r.fecha_llegada, r.motivo, r.detalle, e.nombre, e.correo, e.celular FROM blh7gemxzxusiyohygpd.Propietario AS p INNER JOIN blh7gemxzxusiyohygpd.VehiculoXPropietario AS vxp ON p.id_propietario = vxp.prop_id_propietario INNER JOIN blh7gemxzxusiyohygpd.Vehiculo AS v  ON vxp.veh_matricula = v.matricula INNER JOIN blh7gemxzxusiyohygpd.Reparacion as r ON v.matricula = r.Vehiculo_matricula INNER JOIN blh7gemxzxusiyohygpd.ReparacionXEmpleado AS rxe ON r.id_reparacion = rxe.Reparacion_id_reparacion INNER JOIN blh7gemxzxusiyohygpd.Empleado AS e ON rxe.Empleado_id_empleado = e.id_empleado WHERE p.id_propietario = ${req.id}`, (err, rows, fields) => {
                if (!err) {
                    res.json({
                        usuario: req.id,
                        items: rows
                    });
                } else {
                    res.json('Database ERROR', err);
                }
                connection.release();
            });
        }); 
    }
});

router.get('/reparacion/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    poolConnection.getConnection((err, connection) => {
        connection.query(`SELECT * from blh7gemxzxusiyohygpd.Reparacion AS r WHERE r.id_reparacion = ${id} `, (err, rows, fields) => {
            if (!err) {
                res.json({
                    usuario: req.id,
                    items: rows
                });
            } else {
                res.json('Database ERROR', err);
            }
            connection.release();
        });
    });
});

router.get('/VehXemp/:matr', verifyToken, (req, res) => {
    const { matr } = req.params;
    poolConnection.getConnection((err, connection) => {
        connection.query(`SELECT r.Vehiculo_matricula, r.fecha_llegada, r.motivo, r.detalle, e.nombre, e.correo, e.celular FROM blh7gemxzxusiyohygpd.Propietario AS p INNER JOIN blh7gemxzxusiyohygpd.VehiculoXPropietario AS vxp ON p.id_propietario = vxp.prop_id_propietario INNER JOIN blh7gemxzxusiyohygpd.Vehiculo AS v  ON vxp.veh_matricula = v.matricula INNER JOIN blh7gemxzxusiyohygpd.Reparacion as r ON v.matricula = r.Vehiculo_matricula INNER JOIN blh7gemxzxusiyohygpd.ReparacionXEmpleado AS rxe ON r.id_reparacion = rxe.Reparacion_id_reparacion INNER JOIN blh7gemxzxusiyohygpd.Empleado AS e ON rxe.Empleado_id_empleado = e.id_empleado WHERE p.id_propietario = ${req.id} AND v.matricula = '${matr}'`, (err, rows, fields) => {
            if (!err) {
                console.log(rows);
                res.json({
                    usuario: req.id,
                    items: rows
                });
            } else {
                res.json('Database ERROR', err);
            }
            connection.release();
        });
    });
});

router.put('/reparaciones/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    let rep = req.body;
    poolConnection.getConnection((err, connection) => {
        connection.query(`UPDATE blh7gemxzxusiyohygpd.Reparacion SET detalle = ?, fecha_salida = ?, Estado_id_estado = ? WHERE id_reparacion = ?`,
            [rep.detalle, rep.fecha_salida, rep.estado, id], (err, rows, fields) => {
                if (!err) {
                    res.json({
                        message: 'Actualizado con exito'
                    });
                } else {
                    res.json({
                        ERROR: err
                    });
                }
                connection.release();
            });
    });
});

router.delete('/eliminarRep/:id/:matr', verifyToken, async (req, res) => {
    /* res.json({
        params: req.params,
        usuario: req.id
    }) */
    let idRep = req.params['id'];
    let matr = req.params['matr'];
    let id = req.id
    /* console.log(idRep, matr);  */
    await deleteRXE(idRep, id);
    await deleteRep(idRep);
    await deleteVXP(matr);
    await deleteVehicle(matr);
    res.json({
        message: 'eliminado con exito'
    });
})

const deleteRXE = (idRep, id) => {
    return new Promise((resolve, reject) => {
        poolConnection.getConnection((err, connection) => {
            connection.query(`DELETE FROM blh7gemxzxusiyohygpd.ReparacionXEmpleado WHERE (Reparacion_id_reparacion = ${idRep}) AND (Empleado_id_empleado = ${id})`, (err, rows) => {
                if (err) {
                    connection.release();
                    throw new Error(err);
                } else {
                    connection.release();
                    console.log('eliminado RXE')
                    resolve();
                }
            });
        });
    });
}
const deleteRep = (idRep) => {
    return new Promise((resolve, reject) => {
        poolConnection.getConnection((err, connection) => {
            connection.query(`DELETE FROM blh7gemxzxusiyohygpd.Reparacion WHERE (id_reparacion = ${idRep})`, (err, rows) => {
                if (err) {
                    connection.release();
                    throw new Error(err);
                } else {
                    connection.release();
                    console.log('eliminado reparacion');
                    resolve();
                }
            });
        });
    });
}

const deleteVXP = (idveh) => {
    return new Promise((resolve, reject) => {
        poolConnection.getConnection((err, connection) => {
            connection.query(`DELETE FROM blh7gemxzxusiyohygpd.VehiculoXPropietario WHERE (veh_matricula = '${idveh}')`, (err, rows) => {
                if (err) {
                    connection.release();
                    throw new Error(err);
                } else {
                    connection.release();
                    console.log('eliminado VXP');
                    resolve();
                }
            });
        });
    });
}

const deleteVehicle = (matr) => {
    return new Promise((resolve, reject) => {
        poolConnection.getConnection((err, connection) => {
            connection.query(`DELETE FROM blh7gemxzxusiyohygpd.Vehiculo WHERE (matricula = '${matr}')`, (err, rows) => {
                if (err) {
                    connection.release();
                    throw new Error(err);
                } else {
                    connection.release();
                    console.log('eliminado vehiculo');
                    resolve();
                }
            });
        });
    });
}

router.post('/sendEmail/:idRep', verifyToken, async (req, res) => {
    let { idRep } = req.params;
    let correo = await getEmailByIdRepair(idRep);
    let enviado = sendEmail(correo, 'Se notifica que uno de sus vehículos ha sido actualizado en el sistema, por favor inicie sesión para estar al tanto de las novedades');
   if(enviado){
       res.json({
          mensaje: 'Enviado correo exitosamente'
      }); 
   }else{
    res.json({
        mensaje: 'No se ha podido enviar el correo'
    }); 
   }
});

const sendEmail = async (email, texto) => {
    let enviado = false; 
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'mipichirilo1@gmail.com',
            pass: 'Ingenieria1.'
        }
    });
    var mailOptions = {
        from: 'Mi pichirilo SAS',
        to: email,
        subject: 'Actualización de tu vehículo',
        text: texto
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
        } else {
            console.log("Email sent");
            enviado = true; 
        }
    });

    return enviado; 
}

const getEmailByIdRepair = (idRep) => {
    return new Promise((resolve, reject) => {
        poolConnection.getConnection((err, connection) => {
            connection.query(`SELECT p.correo FROM blh7gemxzxusiyohygpd.Reparacion AS r INNER JOIN blh7gemxzxusiyohygpd.Vehiculo AS v ON r.Vehiculo_matricula = v.matricula INNER JOIN  blh7gemxzxusiyohygpd.VehiculoXPropietario AS vxp ON v.matricula = vxp.veh_matricula INNER JOIN blh7gemxzxusiyohygpd.Propietario AS p ON vxp.prop_id_propietario = p.id_propietario WHERE r.id_reparacion = ${idRep}`, (err, rows) => {
                if (err) {
                    connection.release();
                    throw new Error(err);
                } else {
                    connection.release();
                    resolve(rows[0].correo);
                }
            });
        });
    });
}

module.exports = router;







