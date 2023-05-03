const ModelController = require('../models/modelController');
const {Ativos} = require('../models/schemaModel');

const myModel = new ModelController;

async function getAtivos(req, res){

    const noAtivos = req.query.noativos;
    const allAtivos = await myModel.findAllAtivos();

    console.log(allAtivos.length)

    res.render('ativos.ejs', { noAtivos, allAtivos});
}
async function addAtivos( req, res){
    const {nome_empresa, cnpj_empresa, codigo_ativo} = req.body
    
    await Ativos.create({
        nome:nome_empresa,
        cnpj:cnpj_empresa,
        codigo: codigo_ativo
    });
    
    res.redirect('/app/ativos')

}

async function deleteAtivo(req, res){
    const id = req.params.id;

    let row = await Ativos.findOne({where:{ id: id}});
    await row.destroy();

    res.send('deleted');
}
async function pageUpdateAtivo(req, res){
    let id = req.params.id;
    let item = await myModel.findOneAtivos({where:{id:id}});


    let allAtivos = (await myModel.findAllAtivos()).map( item => item); 
    let codigoList = allAtivos.map( item => item.codigo);
    
    res.render('updateAtivos.ejs', { item, codigoList });
}

async function updateAtivo(req, res){
    let id = req.params.id;
    console.log(req.body)
    const { nome, cnpj, codigo}= req.body;


    await Ativos.update({
        nome:nome,
        cnpj:cnpj,
        codigo:codigo
    },{where:{id:id}});
    
    res.send('updated')
}

module.exports = { getAtivos, addAtivos, deleteAtivo, pageUpdateAtivo, updateAtivo}