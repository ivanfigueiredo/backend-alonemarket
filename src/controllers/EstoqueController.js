const { validationResult, matchedData } = require('express-validator');


const Produto = require('../models/Produto');
const Estoque = require('../models/Estoque');

module.exports = {
    addEstoque: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);
        let produto = await Produto.findOne({codigoDeBarras: data.codigoDeBarras});

        if(!produto){
            res.json({error: 'Produto não cadastrado!'});
            return;
        }

        const newEstoque = new Estoque({
            idProduto: produto._id,
            qtd: data.qtd,
            qtdMinima: data.qtdMinima,
            dataValidade: data.dataValidade
        });
        await newEstoque.save();
    
        res.json({codigoDeBarras: produto.codigoDeBarras, name: produto.name, qtd: data.qtd,
            qtdMinima: data.qtdMinima, preco: produto.preco, status: produto.status, dataCadastro: produto.dataCadastro,
            dataValidade: data.dataValidade, unidadeDeMedida: produto.unidadeDeMedida, pesoVolume: produto.pesoVolume, 
            fabricante: produto.fabricante, fornecedor: produto.fornecedor});
        
    },
    listarEstoque: async (req, res) => {
        let produto = await Produto.find({status: "Ativo"});
        let estoque = await Estoque.find();

        let listaEstoque = [];

        for(let j in estoque){
            for(let i in produto){
                if(String(estoque[j].idProduto) == produto[i]._id){
                    listaEstoque.push({
                        
                        codigoDeBarras: produto[i].codigoDeBarras,
                        name: produto[i].name,
                        preco: produto[i].preco,
                        qtd: estoque[j].qtd,
                        qtdMinima: estoque[j].qtdMinima,
                        valorEstoque: (parseFloat(produto[i].preco) * estoque[j].qtd).toFixed(2),
                        dataValidade: estoque[j].dataValidade,
                        dataCadastro: produto[i].dataCadastro,
                        unidadeDeMedida: produto[i].unidadeDeMedida,
                        pesoVolume: produto[i].pesoVolume,
                        fabricante: produto[i].fabricante,
                        fornecedor: produto[i].fornecedor,


                        _id: estoque[j]._id
                    });
                }
            }
        }

        res.json({name: this.listarEstoque.name, qtd: listarEstoque.qtd, preco: listarEstoque.valorVenda, validade: listarEstoque.dataValidade});
    },

    estokUpdate: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);

        const estoque = await Estoque.findOne({_id: data._id});

        let updates = {};

        
        if(data.novaQTD){
	        updates.qtd = data.novaQTD;
        }

        if(data.novaDataValidade){
            updates.dataValidade = data.novaDataValidade;
        }

        if(data.novaQtdMinima){
            updates.qtdMinima = data.novaQtdMinima;
        }

        await Estoque.findOneAndUpdate({_id: data._id}, {$set: updates});

        res.json({});
    }
};
