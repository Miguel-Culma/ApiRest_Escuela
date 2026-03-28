const express = require('express');
const routerscurso = express.Router();
const cursoesController = require('../controllers/cursosControllers');

routerscurso.get('/',cursoesController.consultar);

routerscurso.post('/',cursoesController.ingresar);

routerscurso.post('/registraEstudiante',cursoesController.asociarEst)
routerscurso.route('/:id')
        .get(cursoesController.consultarDetalles)
        .put(cursoesController.actualizar)
        .delete(cursoesController.borrar)

module.exports = routerscurso;