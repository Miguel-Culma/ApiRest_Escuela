const {DataTypes} = require('sequelize');
const sequelize = require('../database/conexions');

const idempotencyKey = sequelize.define('idempotency_keys',{
    id:{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    idempotency_key : {
        type : DataTypes.STRING,
        allowNull: false
    },
    endpoint : {
        type : DataTypes.STRING,
        allowNull: false
    },
    method : {
        type : DataTypes.STRING,
        allowNull: false
    },
    response : {
        type : DataTypes.JSON
    },
    created_at : {
        type : DataTypes.DATE,
        defaultValue : DataTypes.NOW
    }
    },{
       tableName : 'idempotency_keys',
       timestamps : false,
       indexes : [
            {
                unique : true,
                fields : ['idempotency_key','endpoint','method']
            }
       ]
    }
);

module.exports = idempotencyKey;
