//importando o express
const express = require('express');

//importando a conexao com o banco de dados que agora está isolada
const database = require('../../connection/databases');

//criando o app para adicionar as novas rotas/endpoints
const app = express.Router();


//criando uma rota do tipo GET para buscar todas as escolas
app.get('/enderecos_clientes', async (req, res) => {
    let dados = await database.execute('SELECT * FROM enderecos_clientes');

    res.send(dados);
});

app.get('/enderecos_clientes/:id', async (req, res) => {
    let dados = await database.execute(`
        SELECT * FROM enderecos_clientes WHERE id='${req.params.id}'
    `);

    res.send(dados[0]);
});

app.post('/enderecos_clientes', async (req, res) => {
    let dados = req.body;

    let sql = await database.execute(`
    INSERT INTO enderecos_clientes (cliente_id, endereco, cidade, estado, cep)
    VALUES ('${req.body.cliente_id}', '${req.body.endereco}','${req.body.cidade}', '${req.body.estado}','${req.body.cep}');
    `);
    
    dados.id = sql.insertId;

    res.status(201).send(dados);
})

app.delete('/enderecos_clientes/:id', async (req, res) => {
    await database.execute(`
        DELETE FROM enderecos_clientes WHERE id='${req.params.id}'
    `);

    res.sendStatus(204);
});

app.patch('/enderecos_clientes/:id', async (req, res) => {
    let dados = req.body; 

    await database.execute(`
        UPDATE enderecos_clientes SET cliente_id='${dados.cliente_id}', endereco='${dados.endereco}', cidade='${dados.cidade}', estado='${dados.estado}', cep='${dados.cep}'
        WHERE id = '${req.params.id}'
    `);
    
    dados.id = parseInt(req.params.id);

    res.send(dados);
});

//exportando todas as rotas criadas nesse arquivo
module.exports = app;