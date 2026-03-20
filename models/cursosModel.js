const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexions');
const estudiante = require('./estudiantesModel');
const profesor = require('./profesoresModel');
const cursoEstudiante = require('../models/cursoEstudianteModels');

const curso = sequelize.define('cursos',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    nombre : {
        type : DataTypes.STRING
    },
    descripcion : {
        type : DataTypes.STRING
    }
    },
    {
     tableName : 'cursos',
     timestamps : false   
    });

// relacion 1:N 
profesor.hasMany(curso, {foreignKey: 'profesor_id'});
curso.belongsTo(profesor, {foreignKey : 'profesor_id'});

// relacion N:M
curso.belongsToMany(estudiante,{
      through: cursoEstudiante, // Nombre de la tabla intermedia
      foreignKey: 'id_curso',   
      otherKey: 'id_estudiante'
});

estudiante.belongsToMany(curso,{
      through: cursoEstudiante, // Nombre de la tabla intermedia
      foreignKey: 'id_estudiante',   
      otherKey: 'id_curso'
})

module.exports = curso;