const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexions')
const CursoEstudiante = sequelize.define('cursos_estudiantes', {
    id_curso: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_estudiante: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    tableName: 'cursos_estudiantes',
    timestamps: false
});

module.exports = CursoEstudiante;