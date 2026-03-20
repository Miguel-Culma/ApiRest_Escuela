const curso = require('../models/cursosModel');
const profesor = require('../models/profesoresModel');
const estudiante = require('../models/estudiantesModel');
class CursoController {
    constructor(){

    }

    async conslutar(req,res){
      try {
          const crs = await  curso.findAll({
                             include: [ {model : profesor}, // relacion 1:M
                                       {model: estudiante, // relacion N:M
                                        through : { attributes: [] } 
                                       }
                                      ]
                            });
            res.status(200).json(crs);
            
          } catch (error) {
            res.status(500).json({Error:error.message});          
          }
    }

    async conslutarDetalles(req,res){
      try {
            const {id} = req.params;
            const crs = await curso.findByPk(id, 
                                            {include:[
                                              {model : profesor},
                                              {model : estudiante,
                                                through : { attributes: [] } 
                                              }

                                            ]
                                            })
            if(!crs){
                return res.status(400).json({Error : `El curso con el id ${id} no existe`})
            }
            res.status(200).json(crs);
          } catch (error) {
            res.status(500).json({Error:error.message});
          } 
    }

    async ingresar(req,res){
      try {
           const {dni,nombre,descripcion,profesor_id} = req.body;
           const profe = await profesor.findByPk(profesor_id);
           if(!profe){
             return res.status(400).json({Respuesta : `El profesor con el id ${profesor_id} no existe`})
           }

           const crs = await curso.create({dni,nombre,descripcion,profesor_id});
           res.status(201).json(crs);

          } catch (error) {
          res.status(500).json({Error:error.message});  
          }  
    }

    async actualizar(req,res){
      try {
           const {id} = req.params;
           const {dni,descripcion,profesor_id} = req.body;
           const [crs] = await curso.update({dni,descripcion,profesor_id}, {where : {id}});
           if(crs === 0){
              return res.status(400).json({Error : `El curso con el id ${id} no existe`});
           }
           res.status(200).json({respuesta : `El curso con el id ${id} ha sido actualizado`});
          } catch (error) {
          res.status(500).json({Error:error.message});
          }    

    }

    async borrar(req,res){
      try {
            const {id} = req.params;
            const crs = await curso.destroy({where:{id}});
            if(crs === 0){
                res.status(400).json({Error : `El curso con el id ${id} no existe`});
            }
             res.status(200).json({respuesta : `El curso con el id ${id} fue elminado`})

          } catch (error) {
          res.status(500).json({Error:error.message}); 
          }    
    }

    async asociarEst(req,res){
      try {
        const { id_estudiante, id_curso } = req.body;

        const crs = await curso.findByPk(id_curso);
        const estu = await estudiante.findByPk(id_estudiante);

        const yaExiste = await crs.hasEstudiante(Number(id_estudiante));
        
        if (yaExiste) {
            return res.status(400).json({
                mensaje: `El estudiante con el id ${id_curso} ya está en el curso`
            });
        }
        if (!crs){ 
            return res.status(404).json({ mensaje: 'Curso no existe' });
        }
        if(!estu){
            return res.status(404).json({ mensaje: 'Estudante no existe' });
        }

        await crs.addEstudiante(id_estudiante);

        res.status(200).json({ mensaje: 'Estudiante agregado al curso' });
          } catch (error) {
          res.status(500).json({Error:error.message});  
          }
    }
}

module.exports = new CursoController();