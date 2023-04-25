const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'./database.db'
});

sequelize.authenticate()
.then( () => {
    console.log('connected!!!');
})
.catch( (err) => {
    console.log('could not connect to database, erro:',err);
})


const Ativos = sequelize.define("Ativo",{
    ativoId:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    codigo:{
        type: DataTypes.STRING,
        allowNull:false
    },
    nome:{
        type: DataTypes.STRING,
        allowNull:false
    },
    cnpj:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{ freezeTableName:true});

const Investimentos = sequelize.define('Investimentos', {
    investId:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    data:{
        type: DataTypes.DATE,
        allowNull:false
    },
    codigo_ativo:{
        type: DataTypes.STRING,
        allowNull:false,
        references:{
            model:'Ativo',
            key:'codigo'
        }
    },
    quantidade:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valor_unidade:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    compra_ou_venda:{
        type: DataTypes.STRING,
        allowNull:false
    },
    // valor_operacao:{
    //     type: DataTypes.FLOAT,
    //     allowNull:false
    // },
    taxa_corretagem:{
        type: DataTypes.FLOAT,
        allowNull:false
    }
    // taxa_imposto:{
    //     type: DataTypes.FLOAT,
    //     allowNull:false
    // },
    // valor_operacao_final:{
    //     type: DataTypes.FLOAT,
    //     allowNull:false
    // }

},{freezeTableName:true})


/// Many to Many Table
const InvestAtivos = sequelize.define('IvestAtivos', {
    AtivoId:{
        type: DataTypes.STRING,
        references:{
            model: Ativos,
            key: 'codigo'
        }
    },
    InvestId:{
        type: DataTypes.STRING,
        references:{
            model: Investimentos,
            key:'codigo_ativo'
        }
    }
})


Ativos.belongsToMany(Investimentos, { through:InvestAtivos });
Investimentos.belongsToMany(Ativos, { through:InvestAtivos });



sequelize.sync().then( () => {
    console.log("All models were synchronized successfully.");
});



module.exports = {Ativos, Investimentos}
