const express = require('express');

const clientesRouter = require('./resources/clientes/routes');
const enderecos_clientesRouter = require('./resources/enderecos_clientes/routes');
const imagens_pg3Router = require('./resources/imagem_pg3/routes');

//iniciando uma aplicacao com express
const app = express();

app.use(express.json()); 

//Colocando o express para usar o router de categoria
app.use(clientesRouter);
app.use(enderecos_clientesRouter);
app.use(imagens_pg3Router);

app.use((req, res) => {
    res.status(404).send("Nenhuma rota encontrada")
})

const PORTA = 8000;

app.listen(PORTA, () => {
    console.log('-----------');
    console.log('-- ATIVO --');
    console.log('-----------');
});



