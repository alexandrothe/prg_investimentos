const {Sequelize, DataTypes} = require('sequelize')
const path = require('path')



const sequelize = new Sequelize({
    dialect:'sqlite',
    storage: path.join(__dirname, 'database.db'),
    dialectOptions:{
        dateStrings: true,
        typeCast: function (field, next) {
            if (field.type === 'DATE') {
                return field.string();
            }
            return next();
        },
    },
});

sequelize.authenticate()
.then( () => {
    console.log('connected!!!');
})
.catch( (err) => {
    console.log('could not connect to database, erro:',err);
})


const Ativos = sequelize.define("Ativo",{
    codigo:{
        type: DataTypes.STRING(6),
        unique:true
    },
    nome:{
        type: DataTypes.STRING(150),
        allowNull:false
    },
    cnpj:{
        type: DataTypes.STRING(35),
        allowNull:false
    }
},{ freezeTableName:true, timestamps:false});


const Investimentos = sequelize.define('Investimentos', {
    data: {
        type: DataTypes.DATEONLY,
        allowNull:false,
    },
    codigoAtivo:{
        type: DataTypes.STRING(6),
        allowNull:false
    },
    quantidade:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valorUnidade:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    compraVenda:{
        type: DataTypes.STRING(1),
        allowNull:false
    },
    taxaCorretagem:{
        type: DataTypes.FLOAT,
        allowNull:false
    }
},{freezeTableName:true, timestamps:false})


Ativos.hasMany(Investimentos, {foreignKey:"AtivoId", onDelete:"CASCADE"});
Investimentos.belongsTo(Ativos);



sequelize.sync().then( () => {
    console.log("All models were synchronized successfully.");
});

module.exports = {Ativos, Investimentos}
