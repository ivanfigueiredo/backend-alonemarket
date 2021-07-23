const { checkSchema } = require('express-validator');


module.exports = {
    addFornecedor: checkSchema({
        name: {
            notEmpty: true,
            errorMessage: 'Informe o nome do fornecedor!'
        },
        cnpj: {
            isLength: 18,
            errorMessage: 'CNPJ inválido!'
        },
        cpf: {
            isLength: 14,
            errorMessage: 'CPF inválido!'
        },
        tipo: {
            notEmpty: true,
            errorMessage: 'Informe o tipo de fornecedor!'
        },
        telefone: {
            notEmpty: true,
            errorMessage: 'Telefone inválido!!'
        },
        bairro: {
            notEmpty: true,
            errorMessage: 'Informe o Bairro do fornecedor!'
        },
        cep: {
            isLength: 9,
            errorMessage: 'CEP Inválido!'
        },
        status: {
            notEmpty: true,
            errorMessage: 'Informe o Status do fornecedor!'
        }
    }),
    listarFornecedor: checkSchema({
        tipo: {
            notEmpty: true,
            errorMessage: 'Informe o tipo de fornecedor!'
        }
    }),
    updateFornecedor: checkSchema({
        _id: {
            notEmpty: true
        },
        name: {
           optional: true
        },
        cnpj: {
            optional: true
        },
        cpf: {
            optional: true
        },
        tipo: {
            optional: true
        },
        telefone: {
            optional: true
        },
        bairro: {
            optional: true
        },
        cep: {
            optional: true
        },
        status: {
            optional: true
        }
    }),
    status: checkSchema({
        _id: {
            notEmpty: true
        },
        status: {
            notEmpty: true
        }
    })
};