const {Sequelize, DataTypes} = require('sequelize')
const path = require('path')


const sequelize = new Sequelize({
    dialect:'sqlite',
    storage: path.join(__dirname, 'database.db')
});

sequelize.authenticate()
.then( () => console.log('connected!!!'))
.catch( (err) => console.log('could not connect to database, erro:',err))


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
},{ freezeTableName:true});



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
    },
    precoMedio:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    lucroPrejuizo:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '/'
    },
},{freezeTableName:true});


Ativos.hasMany(Investimentos, {foreignKey:"AtivoId", onDelete:"CASCADE"});
Investimentos.belongsTo(Ativos);


sequelize.sync().then( () => console.log("All models were synchronized successfully."));

module.exports = {Ativos, Investimentos}
