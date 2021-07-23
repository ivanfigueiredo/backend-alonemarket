const { checkSchema } = require('express-validator');


module.exports = {
    addEstoque: checkSchema({
        codigoDeBarras: {
            notEmpty: true,
            errorMessage: 'Informe o código de barras!'
        },
        qtd: {
            notEmpty: true,
            errorMessage: 'Informe a quantidade de estoque'
        },
        qtdMinima: {
            notEmpty: true,
            errorMessage: 'Informe a quantidade minima!'
        },
        dataValidade: {
            notEmpty: true,
            errorMessage: 'Informe a data de validade'
        }
    }),
    estokUpdate: checkSchema({
        _id: {
        notEmpty: true,            
        errorMessage: 'Informe o Id do estoque'
        },
        novaQTD: {
            optional: true
        },
        novaDataValidade: {
            optional: true
        },
        novaQtdMinima: {
            optional: true
        }
    })
};