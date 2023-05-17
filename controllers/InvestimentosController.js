const ModelController = require('../models/modelController');
const {Investimentos} = require('../models/schemaModel');

const myModel = new ModelController;


async function getInvestimento(req, res){
    let allAtivos = (await myModel.findAllAtivos()).map( item => item); 
    let allInvestimentos = await myModel.findAllInvestimentos();


    if( req.query.target){
        console.log('thres is taget')
    }
    if(allAtivos.length === 0) {
        res.redirect('/app/ativos?noativos=true')
    }
    else{
        let codigoList = allAtivos.map( item => item.codigo);
        res.render('investimentos.ejs',{codigoList, allInvestimentos})
    }
}
async function addInvestimentos(req, res){

    const { data, codigo, quantidade, valorUnitario, compraVenda,
        taxaCorretagem} = req.body;
    
        
        // getting the id of the ativo, searching by the codigo
        let AtivoId;
        let ativos = await myModel.findAllAtivos({where:{codigo:codigo}});
        ativos.forEach( item => AtivoId = item.id );

        await Investimentos.create({
            data: data,
            codigoAtivo:codigo,
            quantidade:quantidade,
            valorUnidade:valorUnitario,
            compraVenda:compraVenda,
            taxaCorretagem:taxaCorretagem,
            AtivoId: AtivoId
        });
        
        res.redirect('/app/investimentos');
}
async function pageUpdateInvestimentos(req, res){
    let id = req.params.id;
    let item = await myModel.findOneInvestimentos({where:{id:id}});


    let allAtivos = (await myModel.findAllAtivos()).map( item => item); 
    let codigoList = allAtivos.map( item => item.codigo);
    
    res.render('updateInvestimentos.ejs', { item, codigoList });

}
async function updateInvestimentos(req, res){
    let id = req.params.id;
    const { data, codigo, quantidade, valorUnitario, compraVenda, taxaCorretagem }= req.body;


     // getting the id of the ativo, searching by the codigo
     let AtivoId;
     let ativos = await myModel.findAllAtivos({where:{codigo:codigo}});
     ativos.forEach( item => AtivoId = item.id );
 
    await Investimentos.update({
        data: data,
        codigo_ativo:codigo,
        quantidade:quantidade,
        valorUnidade:valorUnitario,
        compraVenda:compraVenda,
        taxaCorretagem:taxaCorretagem,
        AtivoId: AtivoId
    },{where:{id:id}});
    
    res.send('updated')


}

async function deleteInvestimentos(req, res){
    const id = req.params.id;

    let row = await Investimentos.findOne({where:{ id: id}});
    await row.destroy();

    res.send('deleted');
}

module.exports = { getInvestimento, addInvestimentos, pageUpdateInvestimentos,updateInvestimentos, deleteInvestimentos}