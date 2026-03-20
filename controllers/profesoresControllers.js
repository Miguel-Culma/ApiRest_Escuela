const e = require('cors');
const profesor = require('../models/profesoresModel');
class ProfesoresController {
    constructor(){

    }

    async conslutar(req,res){
      try {
        const prof = await profesor.findAll();
        res.status(200).json(prof);
      } catch (error) {
        res.status(500).json({Error:error});
      }
    }

    async conslutarDetalles(req,res){
       try {
        const {id} = req.params;
        const prof = await profesor.findByPk(id);
        if(!prof){
            return res.status(400).json({Error : `El profesor con el id ${id} no existe`});
        }
        res.status(200).json(prof);
       } catch (error) {
        res.status(500).json({Error:error});
       }
    }

    async ingresar(req,res){
    try {
        const {dni,nombre,apellido,email,telefono,profesion} = req.body 
        const prof = await profesor.create({dni,nombre,apellido,email,telefono,profesion});
        res.status(200).json(prof);
    } catch (error) {
        res.status(500).json({Error:error});
    }
    }

    async actualizar(req,res){
        try {
          const {id} = req.params;
          const {dni,nombre,apellido,email,telefono,profesion} = req.body;
          const [prof] = await profesor.update({dni,nombre,apellido,email,telefono,profesion},{where : {id}});
          if(prof === 0){
            return res.status(404).json({respuesta : `El profesor con el id ${id} no existe`});
          }
          res.status(200).json({respuesta : `El profesor con el id ${id} ha sido actualizado`});

        } catch (error) {
          res.status(500).json({Error:error});  
        }
    }

    borrar(req,res){
       try {
          const {id} = req.params;
          const prof = profesor.destroy({where:{id}});
          if(prof === 0){
            return res.status(404).json({respuesta:`El profesor con el id ${id} no existe`});
          }
          res.status(200).json({respuesta : `El profesor con el id ${id} fue elminado`});
       } catch (error) {
          res.status(500).json({Error:error});
       }
    }
}

module.exports = new ProfesoresController();