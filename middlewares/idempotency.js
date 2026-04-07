const db = require('../database/conexions.js');

const idempotencyMiddleware = (req, res, next) => {
    const key = req.headers["idempotency-key"];
    const endpoint = req.originalUrl;
    const method = req.method;
    if (!key) {
        return res.status(400).json({ error: "Falta Idempotency-Key" });
    }

    //Buscar si ya existe la key
    db.query(
        `SELECT response 
         FROM idempotency_keys 
         WHERE idempotency_key = ? AND endpoint = ? AND method = ?`,
        [key, endpoint, method],
        (err, results) => {
            if (err){
                return res.status(500).send(err);
            }

            //Si ya existe se devuelve la respuesta guardada
            if (results.length > 0) {
                console.log(`Respuesta encontrada para Idempotency-Key: ${key}, Endpoint: ${endpoint}, Method: ${method}`);
                console.log('El registro ya existe, se devuelve la respuesta guardada');
                return res.json((results[0].response));
            }

            // en originalJson se guarda la función original res.json, que es la encargada de enviar la respuesta al cliente.
            const originalJson = res.json.bind(res);

            // reemplazamos res.json por una nueva función para poder interceptar la respuesta e insertar lainfo en la base de datos antes de enviarla.
            res.json = (body) => {
                db.query(
                    `INSERT INTO idempotency_keys 
                     (idempotency_key, endpoint, method, response)
                     VALUES (?, ?, ?, ?)`,
                    [key, endpoint, method, JSON.stringify(body)], // el body llega del estudiantesControllers
                    (err) => {
                        if (err){ 
                            if (err.code === 'ER_DUP_ENTRY') {
                             console.warn("Llave de idempotencia duplicada detectada en inserción simultánea.");
                          } 
                             console.error("Error guardando idempotencia:", err);
                        }
                    }
                );
                // Dentro de esa nueva funcion usamos originalJson(body) para ejecutar la función original de Express y asi enviar correctamente la respuesta al cliente.
                return originalJson(body);
            };
            //permite que la peticion continue hacia el endpoint correspondiente.
            next();
        }
    );
};

module.exports = idempotencyMiddleware;