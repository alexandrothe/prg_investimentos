const express = require('express');
const ModelController = require('../models/modelController');



const myMondelController = new ModelController;

const bodyParser = require('body-parser')
const router = express.Router();



router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))



router.get('', (req, res) => {
    
    let codigoList = []
    myMondelController.findAllAtivos({attributes:['codigo']}).then((list) => {
        list.forEach( codigo => {
            codigoList.push(codigo.codigo);
        });
        res.render('index.ejs',{codigoList})
    })
    

})

router.post('/post', (req, res) => {
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

    res.redirect('/investimentos')
});


module.exports = router