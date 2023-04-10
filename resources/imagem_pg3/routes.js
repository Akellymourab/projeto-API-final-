//importando o express
const express = require('express');

//importando a conexao com o banco de dados que agora está isolada
const database = require('../../connection/databases');

//criando o app para adicionar as novas rotas/endpoints
const app = express.Router();


//criando uma rota do tipo GET para buscar todas as escolas
app.get('/imagens_pg3', async (req, res) => {
    let dados = await database.execute('SELECT * FROM imagens_pg3');

    res.send(dados);
});

app.get('/imagens_pg3/:id', async (req, res) => {
    let dados = await database.execute(`
        SELECT * FROM imagens_pg3 WHERE id='${req.params.id}'
    `);

    res.send(dados[0]);
});

app.post('/imagens_pg3', async (req, res) => {
    let dados = req.body;

    let sql = await database.execute(`
    INSERT INTO imagens_pg3 (nome, tipo_arquivo, tamanho, link) 
    VALUES ('${req.body.nome}', '${req.body.tipo_arquivo}','${req.body.tamanho}', '${req.body.link}');
    `);
    
    dados.id = sql.insertId;

    res.status(201).send(dados);
})

app.delete('/imagens_pg3/:id', async (req, res) => {
    await database.execute(`
        DELETE FROM imagens_pg3 WHERE id='${req.params.id}'
    `);

    res.sendStatus(204);
});

app.patch('/imagens_pg3/:id', async (req, res) => {
    let dados = req.body; 

    await database.execute(`
        UPDATE imagens_pg3 SET nome='${dados.nome}', tipo_arquivo='${dados.tipo_arquivo}', tamanho='${dados.tamanho}', link='${dados.link}'
        WHERE id = '${req.params.id}'
    `);
    
    dados.id = parseInt(req.params.id);

    res.send(dados);
});

//exportando todas as rotas criadas nesse arquivo
module.exports = app;