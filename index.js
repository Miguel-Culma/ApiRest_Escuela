require('dotenv').config();
const cors = require('cors')
const express = require('express');
const app = express();
const routersEstudiantes = require('./views/estudiantesRouters');
const routersProfesor = require('./views/profesoresRouters');
const routersCurso = require('./views/cursosRouters');
const sequelize = require('./database/conexions');

app.use(express.json());
app.use(cors());
app.use('/estudiantes',routersEstudiantes);
app.use('/profesores',routersProfesor);
app.use('/cursos',routersCurso);

app.get('/',(req,res)=>{
    res.send('Hola Mundo')
})


function conectandoBD(){
        sequelize.authenticate().
        then(()=>console.log('conectado a la base de datos'))
        .catch((error)=> console.log('Error: ', error));
}

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
console.log(`El servidor esta escuchando en el puerto ${PORT}`);
conectandoBD();
})