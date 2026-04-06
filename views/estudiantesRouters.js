const express = require('express');
const routersEstudiantes = express.Router();
const estudiantesController = require('../controllers/estudiantesControllers');
const idempotencyMiddleware = require('../middlewares/idempotency');
routersEstudiantes.get('/', estudiantesController.conslutar);

routersEstudiantes.post('/',idempotencyMiddleware,estudiantesController.ingresar);

// reciben parametros
// paremtro id
routersEstudiantes.route('/:id')
        .get(estudiantesController.conslutarDetalles)
        .put(estudiantesController.actualizar)
        .delete(estudiantesController.borrar);

module.exports = routersEstudiantes;