const db = require('../database/conexions.js');
class ProfesoresController {
    constructor(){

    }

    conslutar(req,res){
       // res.json({msg : 'consultar profesores desde clase'});
        try {
            db.query(`SELECT * FROM profesores`,(error,rows)=>{
                if(error){
                    res.status(400).send(error.message);
                }
                res.status(200).send(rows);
            })
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    conslutarDetalles(req,res){
           //res.json({msg : `consulta profesor ${req.params.id} desde clase`});
           const {id} = req.params;
           try {
             db.query(`SELECT * FROM profesores 
                        WHERE id = ?`,id,(error,rows)=>{
                            if(error){
                                res.status(400).send(error.message);
                            }
                            res.send(rows[0]);

                        })
           } catch (error) {
             res.status(500).send(error.message);
           }
    }

    ingresar(req,res){
       // res.json({msg:'ingreso de profesores desde clase'});
        const {dni,nombre,apellido,email,profesion,telefono} = req.body;
        try {
            db.query(`INSERT INTO profesores(id,dni,nombre,apellido,email,profesion,telefono)
                      VALUES(NULL,?,?,?,?,?,?);`,[dni,nombre,apellido,email,profesion,telefono],
                      (error,rows)=>{
                        if(error){
                            res.status(400).send(error.message);
                        }
                            res.status(201).json(rows);
                      });


        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    actualizar(req,res){
        //res.json({msg : `actualizacion profesor ${req.params.id} desde clase`});
        try {
             const {id} = req.params;
             const {dni,nombre,apellido,email,profesion,telefono} = req.body;
            db.query(`UPDATE profesores
                      SET dni=?, nombre=?, apellido=?, email=?, profesion=?, telefono=?
                      WHERE id=?`,[dni,nombre,apellido,email,profesion,telefono,id],
                    (error,rows)=>{
                        if(error){
                            res.status(400).send(error.message);
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
            db.query(`DELETE FROM profesores
                      WHERE id = ?`,id,(error,rows)=>{
                        if(error){
                            res.status(400).send(error.message);
                        }
                        if(rows.affectedRows === 1){
                            res.status(200).json({
                                id:id,
                                respuesta:"Eliminacion exitosa"
                            });
                        }else{
                            res.send("Id no encontrado")
                        }
                      })


        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = new ProfesoresController();