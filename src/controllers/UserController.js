const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');

const User = require('../models/User');


module.exports = {
    getUsers: async (req, res) => {
        let users = await User.find({eAdmin: 1});
        let operadores = [];

        for(let i in users){
            operadores.push({
                
                _id: users[i].id,
                name: users[i].name,
                password: users[i].passwordHash,
                eAdmin: users[i].eAdmin,
                status: users[i].status
            });
        }

        res.json({operadores});
    },
    info: async (req, res) => {
        let token = await req.query.token;

        const user = await User.findOne({token});
        res.json({token: user.token, name: user.name, eAdmin: user.eAdmin});
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
            const nameCheck = await User.findOne({name: data.name});
            if(!nameCheck){
                res.json({error: 'Usuário não existe!'});
                return;
            }
            if(data.novoName){
                updates.name = data.novoName;
            }
            
            
        }

        if(data.password){
            updates.passwordHash = await bcrypt.hash(data.password, 10);
        }
        
        if(data.status){
            updates.status = await data.status;
        }
        
        await User.findOneAndUpdate({name: data.name}, {$set: updates});

        res.json({});
    },
    remove: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);

        if(data.name){
            const nameCheck = await User.findOne({name: data.name});
            if(!nameCheck){
                res.json({error: 'Usuário não existe!'});
                return;
            }
            await User.remove({name: data.name});
        }
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
        
        await User.findOneAndUpdate({_id: data._id}, {$set: updates});
        res.json({status: data.status});
    }
};