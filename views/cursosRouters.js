const express = require('express');
const routerscurso = express.Router();
const cursoesController = require('../controllers/cursosControllers');
const idempotencyMiddleware = require('../middlewares/idempotency');

routerscurso.get('/',cursoesController.consultar);

routerscurso.post('/',idempotencyMiddleware,cursoesController.ingresar);

routerscurso.post('/registraEstudiante',idempotencyMiddleware,cursoesController.asociarEst)
routerscurso.route('/:id')
        .get(cursoesController.consultarDetalles)
        .put(cursoesController.actualizar)
        .delete(cursoesController.borrar)

module.exports = routerscurso;