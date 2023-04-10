//importando o express
const express = require('express');

//importando a conexao com o banco de dados que agora está isolada
const database = require('../../connection/databases');

//criando o app para adicionar as novas rotas/endpoints
const app = express.Router();


//criando uma rota do tipo GET para buscar todas as escolas
app.get('/clientes', async (req, res) => {
    let dados = await database.execute('SELECT * FROM clientes');

    res.send(dados);
});

app.get('/clientes/:id', async (req, res) => {
    let dados = await database.execute(`
        SELECT * FROM clientes WHERE id='${req.params.id}'
    `);

    res.send(dados[0]);
});

app.post('/clientes', async (req, res) => {
    let dados = req.body;

    let sql = await database.execute(`
    INSERT INTO clientes (nome, sobrenome, email, telefone, data_nascimento, historico_compras)
    VALUES ('${req.body.nome}', '${req.body.sobrenome}','${req.body.email}', '${req.body.telefone}','${req.body.data_nascimento}', '${req.body.historico_compras}');
    `);
    
    dados.id = sql.insertId;

    res.status(201).send(dados);
})

app.delete('/clientes/:id', async (req, res) => {
    await database.execute(`
        DELETE FROM clientes WHERE id='${req.params.id}'
    `);

    res.sendStatus(204);
});

app.patch('/clientes/:id', async (req, res) => {
    let dados = req.body; 

    await database.execute(`
        UPDATE clientes SET nome='${dados.nome}', sobrenome='${dados.sobrenome}', email='${dados.email}', telefone='${dados.telefone}', data_nascimento='${dados.data_nascimento}', historico_compras='${dados.historico_compras}'
        WHERE id = '${req.params.id}'
    `);
    
    dados.id = parseInt(req.params.id);

    res.send(dados);
});

//exportando todas as rotas criadas nesse arquivo
module.exports = app;
