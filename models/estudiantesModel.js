const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexions')

const estudiante = sequelize.define('estudiantes',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    dni: {
        type :DataTypes.STRING
    },
    nombre : {
        type : DataTypes.STRING
    },
    apellido : {
        type : DataTypes.STRING
    },
    email :{
        type : DataTypes.STRING
    }  
    },
    {
     tableName : 'estudiantes',
     timestamps : false   
    });

module.exports = estudiante;


