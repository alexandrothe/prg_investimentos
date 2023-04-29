const express = require('express');

const { getInvest, postInvest} = require('../controllers/InvestimentosController')
const { getAtivos, postAtivos} = require('../controllers/ativoController')



const router = express.Router();

router.get('/ativos', getAtivos);
router.post('/ativos/post', postAtivos);


router.get('/investimentos', getInvest);
router.post('/investimentos/post', postInvest);


module.exports = router