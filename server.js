require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const apiRoutes = require('./src/routes');

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.error("Erro: ", error.message);
}); 

const server = express();

server.use(cors({}));
server.use(express.json());
server.use(express.urlencoded({extended: true}));


server.use(express.static(__dirname+'public'));

server.use('/', apiRoutes);

server.listen(process.env.PORT, () =>{
    console.log(` Rodadndo no endereço: ${process.env.DATABASE}`);
});
