const ModelController = require('../models/modelController');


const myMondel = new ModelController;


getInvest = async (req, res) => {
    let allAtivos = (await myMondel.findAllAtivos()).map( item => item); 
    let allInvestimentos = await myMondel.findAllInvestimentos();

    if(allAtivos.length === 0) {
        res.redirect('/app/ativos?noativos=true')
    }
    else{
        let codigoList = allAtivos.map( item => item.codigo);

        res.render('investimentos.ejs',{codigoList, allInvestimentos})
    }
}

postInvest = async (req, res) => {

    const { data, codigo, quantidade, valor_unitario, compra_venda,
    taxa_corretagem} = req.body;

    
    // getting the id of the ativo, searching by the codigo
    let AtivoId;
    let ativos = await myMondel.findAllAtivos({where:{codigo:codigo}})
    ativos.forEach( item => AtivoId = item.id )


    await myMondel.insertInvestimentos({
        data: data,
        codigo_ativo:codigo,
        quantidade:quantidade,
        valor_unidade:valor_unitario,
        compra_ou_venda:compra_venda,
        taxa_corretagem:taxa_corretagem,
        AtivoId: AtivoId
    });
    
    res.redirect('/app/investimentos');
}

// update = async(req, res) => {

// }


module.exports = { getInvest, postInvest}