const { validationResult, matchedData } = require('express-validator');

const Medidas = require('../models/Medidas');
const Produto = require('../models/Produto');
const moment = require('moment');

module.exports = {
    getProduto: async (req, res) => {

    },
    getMedidas: async (req, res) => {
        let medidas = await Medidas.find();
        
        res.json({medidas});
    },
    addAction: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);

        let prodCheck = await Produto.findOne({codigoDeBarras: data.codigoDeBarras});

        if(prodCheck){
            res.json({error: 'Produto já cadastrado!'});
        } else{
            const newProduto = new Produto({
                codigoDeBarras: data.codigoDeBarras,
                name: data.name,
                preco: data.preco,
                valorVenda: data.valorVenda,
                status: data.status,
                dataCadastro: moment().format("DD/MM/YYYY"),
                unidadeDeMedida: data.unidadeDeMedida,
                pesoVolume: data.pesoVolume,
                fabricante: data.fabricante,
                fornecedor: data.fornecedor
            });
            await newProduto.save();
        }
        res.json({});
    },
    getList: async (req, res) => {
        let produtos = await Produto.find();


        res.json({produtos});
    },    

    editAction: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);

        let updates = {};

        if(data.name){    
            updates.name = data.name;
        }

        if(data.preco){
            updates.preco = data.preco;
        }

        if(data.valorVenda){
            updates.valorVenda = data.valorVenda;
        }
        
        if(data.qtd){
            updates.qtd = data.qtd;
        }

        if(data.dataValidade){
            updates.dataValidade = data.dataValidade;
        }

        if(data.unidadeDeMedida){
            updates.unidadeDeMedida = data.unidadeDeMedida;
        }

        if(data.pesoVolume){
            updates.pesoVolume = data.pesoVolume;
        }

        if(data.fabricante){
            updates.fabricante = data.fabricante;
        }

        if(data.fornecedor){
            updates.fornecedor = data.fornecedor;
        }

        updates.dataCadastro = moment().format("DD/MM/YYYY");
        
        await Produto.findOneAndUpdate({codigoDeBarras: data.codigoDeBarras}, {$set: updates});

        res.json({});
    },
    status: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);
        let updates = {};
       
        updates.status = data.status;
        
        await Produto.findOneAndUpdate({codigoDeBarras: data.codigoDeBarras}, {$set: updates});
        res.json({status: data.status});
    }
};