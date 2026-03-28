const db = require('../database/conexions.js');
class CursoController {
    constructor(){

    }

    conslutar(req,res){
          try {
            db.query(`SELECT * FROM cursos`,(error,rows)=>{
                if(error){
                    return res.status(400).send(error.message);
                }
                res.status(200).send(rows);
            })
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    conslutarDetalles(req,res){
           const {id} = req.params;
           try {
             db.query(`SELECT * FROM cursos
                        WHERE id = ?`,id,(error,rows)=>{
                            if(error){
                               return res.status(400).send(error.message);
                            }
                            res.status(200).send(rows[0]);

                        })
           } catch (error) {
             res.status(500).send(error.message);
           }
    }

    ingresar(req,res){
        const {nombre,descripcion,profesor_id} = req.body;
        try {
            db.query(`INSERT INTO cursos(id,nombre,descripcion,profesor_id)
                      VALUES(NULL,?,?,?);`,[nombre,descripcion,profesor_id],
                      (error,rows)=>{
                        if(error){
                            return res.status(400).send(error.message);
                        }
                            res.status(201).json(rows);
                      });


        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    actualizar(req,res){
         try {
             const {id} = req.params;
              const {nombre,descripcion,profesor_id} = req.body;
            db.query(`UPDATE cursos
                      SET nombre=?, descripcion=?, profesor_id=?
                      WHERE id=?`,[nombre,descripcion,profesor_id,id],
                    (error,rows)=>{
                        if(error){
                            return res.status(400).send(error.message);
                        }
                        if(rows.affectedRows === 1){
                            res.status(200).json({
                                id:id,
                                respuesta : "Actualizacion exitosa"
                            });
                        }else{
                            res.send("Id no encontrado")
                        }
                    })
        } catch (error) {
            res.status(500).send(error)
        }

    }

    borrar(req,res){
         try {
             const {id} = req.params;
            db.query(`DELETE FROM   cursos
                      WHERE id=?`,id,
                    (error,rows)=>{
                        if(error){
                           return res.status(400).send(error.message);
                        }
                        if(rows.affectedRows === 1){
                            res.status(200).json({
                                id:id,
                                respuesta : "Eliminacion exitosa"
                            });
                        }else{
                            res.send("Id no encontrado")
                        }
                    })
        } catch (error) {
            res.status(500).send(error)
        }

    }

    asociarEst(req,res){
        const {id_estudiante, id_curso} = req.body;
        try {
            db.query(`INSERT INTO cursos_estudiantes(id_estudiante,id_curso)
                      VALUES(?,?);`,[id_estudiante,id_curso],
                      (error,rows)=>{
                        if(error){
                            return res.status(400).send(error.message);
                        }
                            res.status(201).json({res : 'estudiante matriculado al curso'});
                      });


        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = new CursoController();