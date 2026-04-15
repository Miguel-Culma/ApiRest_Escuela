const idempotencyKeyModel = require('../models/idempotecyKeysModel');
const idempotencyMiddleware = async (req, res, next) => {
    try {
        const key = req.headers["idempotency-key"];
        const endpoint = req.originalUrl;
        const method = req.method;

        if(!key){
            return res.status(400).json({error : 'Falta Idempotency-Key'});
        }

        // Buscar si la key ya existe en la bd
        const exist = await idempotencyKeyModel.findOne({
            where : {
                idempotency_key : key,
                endpoint : endpoint,
                method : method
            }
        });

        if(exist){
        return res.status(200).json(exist.response); // se devuelve la respuesta almacenada en la base de datos
        }

        const originalJson = res.json.bind(res);

        res.json = async(body)=>{
            try {
                await idempotencyKeyModel.create({
                    idempotency_key : key,
                    endpoint : endpoint,
                    method : method,
                    response : body
                });
            } catch (err) {
                       if (err){ 
                            if (err.code === 'ER_DUP_ENTRY') {
                             console.warn("Llave de idempotencia duplicada detectada en inserción simultánea.");
                          } 
                             console.error("Error guardando idempotencia:", err);
                        }
            }
            return originalJson(body)
        }
        // continua al controller correspondiente
        next();


    } catch (error) {
        console.error('Error en el middleware de idempotencia:',error);
        res.status(500).json({error : 'Error en el servidor'});
    }
}

module.exports = idempotencyMiddleware;