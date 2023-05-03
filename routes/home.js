const express = require('express');

const {
    getInvestimento,
    pageUpdateInvestimentos,
    addInvestimentos,
    updateInvestimentos,
    deleteInvestimentos
} = require('../controllers/InvestimentosController');

const {
    getAtivos,
    addAtivos,
    pageUpdateAtivo,
    updateAtivo,
    deleteAtivo
} = require('../controllers/ativoController');



const router = express.Router();

router.get('/ativos', getAtivos);
router.post('/ativos/post', addAtivos);
router.get('/ativos/update/:id', pageUpdateAtivo);
router.put('/ativos/update/:id', updateAtivo);
router.delete('/ativos/delete/:id', deleteAtivo);


router.get('/investimentos', getInvestimento);
router.post('/investimentos/post', addInvestimentos);
router.get('/investimentos/update/:id', pageUpdateInvestimentos); /// this page will sever the file to make the changes and the got to the put route 
router.put('/investimentos/update/:id', updateInvestimentos);
router.delete('/investimentos/delete/:id', deleteInvestimentos);

module.exports = router