const express = require('express');
const router = express.Router();

const Auth = require('./middlewares/Auth');
const AuthOperador = require('./middlewares/AuthOperador');

const AuthValidator = require('./validators/AuthValidator');
const EstoqueValidator = require('./validators/EstoqueValidator');
const UserValidator = require('./validators/UserValidator');
const ProdutoValidator = require('./validators/ProdutoValidator');
const FornecedorValidator = require('./validators/FornecedorValidator.js');

const AuthController = require('./controllers/AuthController');
const EstoqueController = require('./controllers/EstoqueController');
const UserController = require('./controllers/UserController');
const ProdutoController = require('./controllers/ProdutoController');
const FornecedorController = require('./controllers/FornecedorController');



router.get('/ping', (req, res)=>{
    res.json({pong: true});
}); 

router.post('/user/signin', AuthValidator.signin, AuthController.signin);
router.post('/user/signup',AuthValidator.signup, Auth.private, AuthController.signup);

router.get('/user/getusers', UserController.getUsers);
router.put('/user/status', UserValidator.statusUpdate, Auth.private, UserController.status);

router.get('/user/me', AuthOperador.private, UserController.info);
router.put('/user/me', UserValidator.editAction, Auth.private, UserController.editAction);

router.get('/undmedidas', ProdutoController.getMedidas);

router.post('/fornecedor/add', FornecedorValidator.addFornecedor, Auth.private, FornecedorController.addFornecedor);
router.get('/fornecedor/list',FornecedorValidator.listarFornecedor, FornecedorController.listFornecedores);
router.get('/fornecedor/listarTodos', FornecedorController.listarTodosFornecedores);
router.put('/fornecedor/update', FornecedorValidator.updateFornecedor, Auth.private, FornecedorController.editAction);
router.put('/fornecedor/status', FornecedorValidator.status, Auth.private, FornecedorController.status);


router.post('/produto/add', ProdutoValidator.addAction, Auth.private, ProdutoController.addAction);
router.get('/produto/list', ProdutoController.getList);
router.put('/produto/update', ProdutoValidator.editAction, Auth.private, ProdutoController.editAction);
router.put('/produto/status', ProdutoValidator.status, Auth.private, ProdutoController.status);


router.post('/estoque/add',EstoqueValidator.addEstoque, Auth.private, EstoqueController.addEstoque);
router.get('/estoque/estoqueItem', EstoqueValidator.getItemEstoque, EstoqueController.getItemEstoque);
router.get('/estoque/lista', EstoqueController.listarEstoque);
router.get('/estoqueweb/lista', EstoqueController.listarEstolMobile);
router.put('/estoque/update', EstoqueValidator.estokUpdate, Auth.private, EstoqueController.estokUpdate); 
router.put('/estoque/altProdVencido', EstoqueValidator.altProdVencido, Auth.private, EstoqueController.altProdVencido);


module.exports = router;