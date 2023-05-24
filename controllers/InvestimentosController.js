const { Investimentos, Ativos } = require('../models/schemaModel');


async function getPageInvestimento(req, res){

    res.render('investimentos.ejs');
}

async function getInvestimento(req, res){
    let allAtivos = await Ativos.findAll()
    let allInvestimentos = await Investimentos.findAll();

    let codigoList = allAtivos. map( item => item.codigo);

    console.log(allAtivos.length)
    if(allAtivos.length === 0) {
        return res.json({ isNull: true })
    }
    
    if( req.query.filter){
        

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
        
        res.redirect('/app/investimentos/page');
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

    try{

        console.log('shoul update')
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
        
        res.json( { ok:true , msg: 'Atualizado com sucesso' } )

    }
    catch( err ) {
        res.json( {ok: false, msg: 'erro ao tentar atualizar Investimentos '})
    }


}

async function deleteInvestimentos(req, res){
    const id = req.params.id;

    let row = await Investimentos.findOne({where:{ id: id}});
    await row.destroy();

    res.send('deleted');
}

module.exports = {
    getInvestimento,
    getPageInvestimento,
    addInvestimentos,
    pageUpdateInvestimentos,
    updateInvestimentos,
    deleteInvestimentos
}