require('dotenv').config();
const cors = require('cors')
const express = require('express');
const app = express();
const routersEstudiantes = require('./views/estudiantesRouters');
const routersProfesor = require('./views/profesoresRouters');
const routersCurso = require('./views/cursosRouters');
app.get('/',(req,res)=>{
    res.send('Hola Mundo')
})

app.use(express.json());
app.use(cors());
app.use('/estudiantes',routersEstudiantes);
app.use('/profesores',routersProfesor);
app.use('/cursos',routersCurso);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
console.log(`El servidor esta escuchando en el puerto ${PORT}`)
})