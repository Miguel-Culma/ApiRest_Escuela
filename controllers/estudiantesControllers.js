const db = require('../database/conexions.js');
class EstudianteController {
    constructor(){

    }

    conslutar(req,res){
       try {
          db.query(`SELECT * FROM estudiantes`,(error,rows)=>{
            if(error){
                return res.status(400).send(error.message);
            }
                res.status(200).json(rows);
        })

       } catch (error) {
        res.status(500).send(error.message);
       }
    }

    conslutarDetalles(req,res){
        try {
            const {id} = req.params;
            db.query(`SELECT * FROM estudiantes 
                      WHERE id = ?`,id,(error,rows)=>{
                        if(error){
                           return  res.status(500).send(error.message);
                        }
                        res.status(200).json(rows[0]);
                      })

        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    ingresar(req,res){

        try {
            const {dni,nombre,apellido,email} = req.body;
            db.query(`INSERT INTO estudiantes(id,dni,nombre,apellido,email)
                    VALUES(NULL,?,?,?,?);`,
                    [dni,nombre,apellido,email],(error,rows)=>{
                        
                        if(error){
                            return res.status(400).send(error);
                        }
                            res.status(201).json({id : rows.insertId,
                                                  mensaje : "Insert existoso"
                            });

                    });
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    actualizar(req,res){
        try {
            const {id} = req.params;
            const {dni,nombre,apellido,email} = req.body;
            db.query(`UPDATE estudiantes SET dni = ?,nombre = ?, apellido = ?,email = ? 
                      WHERE id = ?`,[dni,nombre,apellido,email,id] , (error,rows)=>{
                        if(error){
                           return res.status(500).send(error.message);
                        }
                        if(rows.affectedRows === 1){
                             res.status(200).json({id:id,
                                                  mensaje : 'Registro actualizado correctamente'
                            })
                        }  else{
                             res.status(404).json({id:id,
                                                  mensaje : 'Registro no encontrado'
                            })
                        }
                      })


        } catch (error) {
                res.send(error.message)
        }
    }

    borrar(req,res){
        // res.json({msg : `borrado estudiante ${req.params.id} desde clase`});
        try {
            const {id} = req.params;
            db.query(`DELETE FROM estudiantes
                      WHERE id = ?`,id, (error,rows)=>{
                        if(error){
                            return res.status(500).send(error.message);
                        }
                        if(rows.affectedRows === 1){
                            res.status(200).json({
                                id:id,
                                respuesta : 'Registro eliminado con exito'
                            });
                        }
                      })
            
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = new EstudianteController();