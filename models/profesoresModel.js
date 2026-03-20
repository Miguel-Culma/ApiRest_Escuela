const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexions');

const profesor = sequelize.define('profesores',{
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
    },
    telefono : {
        type : DataTypes.STRING
    },
    profesion : {
        type : DataTypes.STRING
    }
    },
    {
     tableName : 'profesores',
     timestamps : false   
    });

module.exports = profesor;