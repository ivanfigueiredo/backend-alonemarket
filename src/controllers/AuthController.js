const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');

const User = require('../models/User');

module.exports = {
    signin: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);

        //Validando o Usuário
        const user = await User.findOne({name: data.name });
        if(!user){
            res.json({error: 'Usuário e/ou senha inválidos!'});
            return;
        }

        //Validando a Senha do Usuário
        const match = await bcrypt.compare(data.password, user.passwordHash);
        if(!match) {
            res.json({error: 'Usuário e/ou senha inválidos!'});
            return;
        }
        //Validando permissoes do usuário
        if (data.eAdmin != user.eAdmin){
            res.json({error: 'Opção de Login inválida!'});
            return;
        }

        //Validando status do usuário
        if(String(user.status) == "Inativo"){
            res.json({error: 'Usuário não cadastrado!'});
            return;
        }

        
        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        user.token = token;
        await user.save();

        
        res.json({token, name: data.name, eAdmin: data.eAdmin});                
    },
    signup: async (req, res) => {
        const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.json({error: errors.mapped()});
                return;
            }

        const data = matchedData(req);
        
        const user = await User.findOne({name: data.name});
        if(user){
            res.json({error: 'Usuário já existe!'});
            return;
        }

        const passwordHash = await bcrypt.hash(data.password, 10);

        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        const newUser = new User({
            name: data.name,
            passwordHash: passwordHash,
            status: data.status,
            eAdmin: data.eAdmin,
            token
        });
        await newUser.save();

        res.json({token});
        }, 

        signinApp: async (req, res) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.json({error: errors.mapped()});
                return;
            }
    
            const data = matchedData(req);
    
            //Validando o Usuário
            const user = await User.findOne({name: data.name });
            if(!user){
                res.json({error: 'Usuário e/ou senha inválidos!'});
                return;
            }
    
            //Validando a Senha do Usuário
            const match = await bcrypt.compare(data.password, user.passwordHash);
            if(!match) {
                res.json({error: 'Usuário e/ou senha inválidos!'});
                return;
            }
    
            
                
    
                
            res.json({name: data.name});
        }
};