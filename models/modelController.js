const {Ativos, Investimentos} = require('./investimentos');




class ModelController{
    #investimentos = Investimentos;
    #ativos = Ativos;

    
    async insertInvestimentos( dict_values ){
        const {data,
            codigo_ativo,
            quantidade,
            valor_unidade,
            compra_ou_venda,
            taxa_corretagem,
            AtivoId
        } = dict_values;
        
        try{
            await this.#investimentos.create({
                data: data,
                codigo_ativo: codigo_ativo,
                quantidade: quantidade,
                valor_unidade: valor_unidade,
                compra_ou_venda: compra_ou_venda,
                taxa_corretagem: taxa_corretagem,
                AtivoId:AtivoId
            });

            console.log('Investimentos Adicionado com sucesso.!!');
        }
        catch(err){
            console.log("Could not insert the investiment to database");
            console.log(`Error: ${err}`);
        }
    }
    async insertAtivos( dict_values ){
        
        try{
            const {codigo, nome, cnpj} = dict_values;

            await this.#ativos.create({
                codigo:codigo,
                nome:nome,
                cnpj:cnpj
            })

            console.log('Ativo adicionado com sucesso!!');
        }
        catch(err){
            console.log("Não foi possivel adicionar Ativos.");
            console.log(`Erro: ${err}`);
        }
       
    }
    async findAllAtivos(params){
        try{

            return await this.#ativos.findAll(params);
        }
        catch(err){
            console.log('Could not find Ativos');
            console.log('Error:',err);
        }
    }
    async findAllInvestimentos(params){
        try{
            return await this.#investimentos.findAll(params);
        }
        catch(err){
            console.log('Could not find investimentos.');
            console.log('Erro:',err);
        }
    }
}



module.exports = ModelController