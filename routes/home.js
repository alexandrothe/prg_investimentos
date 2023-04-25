const express = require('express');
const {Investimentos, Ativos} = require('../models/investimentos')


const bodyParser = require('body-parser')
const router = express.Router();



router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))



router.get('', (req, res) => {
    res.render('index.ejs')
})

router.post('/post', (req, res) => {
    const { data, codigo, quantidade, valor_unitario, compra_venda,
    taxa_corretagem, taxa_imposto} = req.body;
    
    res.redirect('/investimentos')
});


module.exports = router