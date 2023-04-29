const ModelController = require('../models/modelController');

const myMondelController = new ModelController;

getAtivos = (req, res) => {
    const noAtivos = req.query.noativos;

    res.render('ativos.ejs', { noAtivos });
}

postAtivos = async (req, res) => {
    const {nome_empresa, cnpj_empresa, codigo_ativo} = req.body
    
    await myMondelController.insertAtivos({
        nome: nome_empresa,
        cnpj: cnpj_empresa,
        codigo: codigo_ativo
    });


    res.redirect('/app/ativos')
}


module.exports = { getAtivos, postAtivos}