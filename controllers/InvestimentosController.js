const { Investimentos, Ativos } = require('../models/schemaModel');


async function getPageInvestimento(req, res){

    let allAtivos = await Ativos.findAll()
    let allInvestimentos = await Investimentos.findAll();

    let codigoList = allAtivos. map( item => item.codigo);

    if(allAtivos.length === 0) {res.redirect('/app/ativos?noativos=true')}
    
    if( req.query.filter){
        
        console.log(req.query);
        let options = {
            order:[],
            where:{}
        }


        if(req.query.data){ options.order.push(['data', req.query.data]) }
        if(req.query.compraVenda){ options.where.compraVenda = req.query.compraVenda }
        if(req.query.codigoAtivo){ options.where.codigoAtivo = req.query.codigoAtivo} 
        // if(req.query.valorFinal){ options.valorFinal = req.query.valorFinal }

        
        allInvestimentos = await Investimentos.findAll( options );

    }
    res.render('investimentos.ejs', { allInvestimentos, codigoList});
}

async function getInvestimento(req, res){
    let allAtivos = await Ativos.findAll()
    let allInvestimentos = await Investimentos.findAll();

    let codigoList = allAtivos. map( item => item.codigo);

    if(allAtivos.length === 0) {res.redirect('/app/ativos?noativos=true')}
    
    if( req.query.filter){
        
        console.log(req.query);
        let options = {
            order:[],
            where:{}
        }


        if(req.query.data){ options.order.push(['data', req.query.data]) }
        if(req.query.compraVenda){ options.where.compraVenda = req.query.compraVenda }
        if(req.query.codigoAtivo){ options.where.codigoAtivo = req.query.codigoAtivo} 
        // if(req.query.valorFinal){ options.valorFinal = req.query.valorFinal }

        
        allInvestimentos = await Investimentos.findAll( options );

    }

    res.json(
        {
            allInvestimentos,
            codigoList
        }

    )
    // res.render('investimentos.ejs',{ codigoList, allInvestimentos });
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

module.exports = { getInvestimento, getPageInvestimento, addInvestimentos, pageUpdateInvestimentos,updateInvestimentos, deleteInvestimentos}