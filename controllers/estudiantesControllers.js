const estudiante = require('../models/estudiantesModel.js');

class EstudianteController {
    constructor(){
        
    }

    async conslutar(req,res){
      try {
        const est = await estudiante.findAll();
        res.status(200).json(est);
      } catch (error) {
        res.status(500).json({Error: error.message});
      }
    }

    async conslutarDetalles(req,res){
        try {
            const {id} = req.params;
            const est = await estudiante.findByPk(id);
            if(!est){
                return res.status(400).json({error : `El estudiante con el id ${id} no existe`});
            }
            res.status(200).json(est);

        } catch (error) {
            res.status(500).json({Error:error.message});
        }
    }

    async ingresar(req,res){
        try {
            const {dni,nombre,apellido,email} = req.body;
            const est = await estudiante.create({dni,nombre,apellido,email});
            res.status(201).json(est);
        } catch (error) {
            res.status(500).json({Error:error.message});
        }
      
    }

    async actualizar(req,res){
        try {
            const {id} = req.params;
            const {dni,nombre,apellido,email} = req.body;
            const [est] = await estudiante.update({dni,nombre,apellido,email},{where:{id}});
            if( est === 0){
                return res.status(404).json({respuesta : 'estudiante no encontrado'})
            }
            res.status(200).json({respuesta : 'estudiante actualizado'});

        } catch (error) {
            res.status(500).json({Error:error.message});
        }
    }

    async borrar(req,res){
        try {
            const {id} = req.params;
            const est = await estudiante.destroy({where:{id}});
            if(est === 0){
                return res.status(404).json({respuesta : 'Estudiante no encontrado'});
            }
            res.status(200).json({respuesta : 'Estudiante eliminado'});
        } catch (error) {
            res.status(500).json({Error:error.message});
        }
    }
}

module.exports = new EstudianteController();