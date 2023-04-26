const express = require('express');
const ModelController = require('../models/modelController');



const myMondelController = new ModelController;

const router = express.Router();

router.get('/ativos', (req, res) => {
    const noAtivos = req.query.noativos;

    res.render('ativos.ejs', { noAtivos });
});
router.post('/ativos/post', (req, res) => {

    const {nome_empresa, cnpj_empresa, codigo_ativo} = req.body
    
    myMondelController.insertAtivos({
        nome: nome_empresa,
        cnpj: cnpj_empresa,
        codigo: codigo_ativo
    });


    res.redirect('/app/ativos')
});

router.get('/investimentos', (req, res) => {
    

    ( async () => {
        let allAtivos = (await myMondelController.findAllAtivos()).map( item => item);
        let allInvestimentos = await myMondelController.findAllInvestimentos();

        if(allAtivos.length === 0) {
            res.redirect('/app/ativos?noativos=true')
        }
        else{

            let codigoList = allAtivos.map( item => item.codigo);
            res.render('investimentos.ejs',{codigoList, allInvestimentos})
        }
        
    })();

});

router.post('/investimentos/post', (req, res) => {

    const { data, codigo, quantidade, valor_unitario, compra_venda,
    taxa_corretagem} = req.body;


    myMondelController.insertInvestimentos({
        data: data,
        codigo_ativo:codigo,
        quantidade:quantidade,
        valor_unidade:valor_unitario,
        compra_ou_venda:compra_venda,
        taxa_corretagem:taxa_corretagem,
    });

    res.redirect('/app/investimentos')
});


module.exports = router