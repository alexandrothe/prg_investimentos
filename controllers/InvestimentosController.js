const { Investimentos, Ativos } = require('../models/schemaModel');


async function getInvestimento(req, res){
    let allAtivos = await Ativos.findAll()
    let allInvestimentos = await Investimentos.findAll();

    let codigoList = allAtivos. map( item => item.codigo);

    if(allAtivos.length === 0) {res.redirect('/app/ativos?noativos=true')}
    
    if( req.query.filter){
        
        let options = {
            order:[[]]
        }

        if(req.query.data){ dataToFilter.order =  [['data', data]]}
        if(req.query.compraVenda){ dataToFilter.compraVenda = req.query.compraVenda}
        if(req.query.codigoAtivo){ dataToFilter.codigoAtivo = req.query.codigoAtivo}
        if(req.query.valorFinal){ dataToFilter.valorFinal = req.query.valorFinal}

        allInvestimentos = await Investimentos.findAll( options );

    }

    console.log(allInvestimentos)
    res.render('investimentos.ejs',{ codigoList, allInvestimentos });
}
async function addInvestimentos(req, res){

    const { data, codigo, quantidade, valorUnitario, compraVenda,
        taxaCorretagem} = req.body;
    
        
        // getting the id of the ativo, searching by the codigo
        let AtivoId;

        let ativos = await Ativos.findAll({where:{ codigo:codigo}})
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
    let item = await Investimentos.findOne({where:{ id: id}});


    let allAtivos = await Ativos.findAll();
    let codigoList = allAtivos.map( item => item.codigo);
    
    res.render('updateInvestimentos.ejs', { item, codigoList });

}
async function updateInvestimentos(req, res){
    let id = req.params.id;
    const { data, codigo, quantidade, valorUnitario, compraVenda, taxaCorretagem } = req.body;


     // getting the id of the ativo, searching by the codigo
     let AtivoId;
    //  let ativos = await myModel.findAllAtivos({where:{codigo:codigo}});
    let ativos = await Ativos.findAll({ where: { codigo:codigo }});

    ativos.forEach( item => AtivoId = item.id );
 
    await Investimentos.update({
        data: data,
        codigoAtivo:codigo,
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