const express = require('express');
const ModelController = require('../models/modelController');



const myMondelController = new ModelController;

const router = express.Router();

router.get('/ativos', (req, res) => {
    res.render('ativos.ejs');
});
router.get('/ativos/post', (req, res) => {
    res.redirect('/app/ativos')
});

router.get('/investimentos', (req, res) => {
    

    ( async () => {
        let allAtivos = (await myMondelController.findAllAtivos()).map( item => item);
        let allInvestimentos = await myMondelController.findAllInvestimentos();

        console.log(allInvestimentos)
        let codigoList = allAtivos.map( item => item.codigo);

        res.render('invest.ejs',{codigoList, allInvestimentos})
        
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
        // taxa_imposto: taxa_imposto
    });

    res.redirect('/app/investimentos')
});


module.exports = router