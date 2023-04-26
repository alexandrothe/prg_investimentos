const {Ativos, Investimentos} = require('./investimentos');




class ModelController{
    constructor(){
        this.investimentos = Investimentos,
        this.ativos = Ativos;
    }

    insertInvestimentos( dict_values ){
        const {data,
            codigo_ativo,
            quantidade,
            valor_unidade,
            compra_ou_venda,
            taxa_corretagem} = dict_values;
    
        this.investimentos.create({
            data: data,
            codigo_ativo: codigo_ativo,
            quantidade: quantidade,
            valor_unidade: valor_unidade,
            compra_ou_venda: compra_ou_venda,
            taxa_corretagem: taxa_corretagem
        });   
    }
    insertAtivos( dict_values ){
        const {codigo, nome, cnpj} = dict_values;

        this.ativos.create({
            codigo:codigo,
            nome:nome,
            cnpj:cnpj
        })
        .then( (sucs) =>{
            console.log('Ativo Adicionado com sucesso!!');
        } ).catch( (erro) => {
            console.log('Não foi possivel adicionar Ativos. Erro:', erro)
        });
    }
    async findAllAtivos(params){
        return await this.ativos.findAll(params);
    }
    async findAllInvestimentos(params){
        return await this.investimentos.findAll(params);
    }
}


// let model = new ModelController();

module.exports = ModelController