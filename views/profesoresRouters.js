const express = require('express');
const routersProfesor = express.Router();
const profesoresController = require('../controllers/profesoresControllers');
const idempotencyMiddleware = require('../middlewares/idempotency');
routersProfesor.get('/',profesoresController.conslutar);

routersProfesor.post('/',idempotencyMiddleware,profesoresController.ingresar);

routersProfesor.route('/:id')
        .get(profesoresController.conslutarDetalles)
        .put(profesoresController.actualizar)
        .delete(profesoresController.borrar)

module.exports = routersProfesor;