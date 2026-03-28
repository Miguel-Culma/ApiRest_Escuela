const express = require('express');
const routersProfesor = express.Router();
const profesoresController = require('../controllers/profesoresControllers');

routersProfesor.get('/',profesoresController.consultar);

routersProfesor.post('/',profesoresController.ingresar);

routersProfesor.route('/:id')
        .get(profesoresController.consultarDetalles)
        .put(profesoresController.actualizar)
        .delete(profesoresController.borrar)

module.exports = routersProfesor;