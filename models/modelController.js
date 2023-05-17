const {Ativos, Investimentos} = require('./schemaModel');


class ModelController{

    #investimentos = Investimentos;
    #ativos = Ativos;

    
    async insertInvestimentos( dict_values ){
        const {
            data,
            codigoAtivo,
            quantidade,
            valorUnidade,
            compraVenda,
            taxaCorretagem,
            AtivoId
        } = dict_values;
        
        try{
            await this.#investimentos.create({
                data: data,
                codigoAtivo: codigoAtivo,
                quantidade: quantidade,
                valorUnidade: valorUnidade,
                compraVenda: compraVenda,
                taxaCorretagem: taxaCorretagem,
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

    async deleteAtivos(params){
        try{
            let row = await this.#ativos.findOne(params);
            if(row){
                await row.destroy();
                console.log('Ativo deleted successfully')
            }
            else{
                throw "Error cound not find the Ativos"
            }

        }
        catch(err){
            console.log('could not delete the Ativo!!!');
            console.log(`Erro: ${err}`);
        }
    }

    async deleteInvestimentos(params){
        try{
            console.log(params)
            let row = await this.#investimentos.findOne(params);
            
            if(row){
                row.destroy()
                console.log('Investimentos deleted successfully')
            }
            else{
                throw "Erro could not find the Investimentos"
            }
           
        }
        catch(err){
            console.log('Could not delete Investimentos!!!');
            console.log(`Error:${err}`)
        }
    }

    async updateAtivos(newValues, whereValues){

        try{
            await this.#ativos.update(newValues,whereValues);

            console.log("Ativo updated successufully!!")
        }
        catch(err){
            console.log("Ativo could not be updated!!");
            console.log(`Error:${err}`)
        }
    }
    async updateInvestimentos(newValues, whereValues){
        try{
            await this.#investimentos.update(newValues, whereValues);
            
            console.log('Investimentos updated successufuly!!!')
        }
        catch(err){
            console.log("Investimentos could not be updated!!");
            console.log(`Error:${err}`)
        }
    }
    async findOneInvestimentos(params){
        try{
           return  await this.#investimentos.findOne(params);
        }
        catch(err){
            console.log('Could not find one investimentos');
            console.log('Erro:',err);
        }
    }
    async findOneAtivos(params){
        try{
           return  await this.#ativos.findOne(params);
        }
        catch(err){
            console.log('Could not find one Ativos');
            console.log('Erro:',err);
        }
    }
}


module.exports = ModelController