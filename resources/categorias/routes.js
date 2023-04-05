const app = require('express').Router();
const database = require('../../connection/database');

const TABLE_NAME = 'categoria';
const BASE_URL = '/categorias';

app.get(BASE_URL, async (req, res) => {
    let dados = await database.execute(`SELECT * FROM ${TABLE_NAME}`);

    res.send(dados);
});

app.get(`${BASE_URL}/:id`, async (req, res) => {
    let dados = await database.execute(`
        SELECT * FROM categoria WHERE id='${req.params.id}'
    `);

    res.send(dados[0]);
});

app.post(BASE_URL, async (req, res) => {
    let corpo = req.body;

    let sql = await database.execute(`
        INSERT INTO categoria (nome, descricao, imagem)
        VALUES ('${corpo.nome}', '${corpo.descricao}', '${corpo.imagem}')
    `);

    corpo.id = sql.insertId;
    
    res.send(corpo);
});

app.patch(`${BASE_URL}/:id`, async (req, res) => {
    let dados = req.body;

    let jaExiste = await database.execute(`
        SELECT * FROM categoria WHERE id='${req.params.id}'
    `);

    //testando se realmente se existe algum banner com aquele id
    if (undefined === jaExiste[0]) {
        res.sendStatus(404);
        return;
    }

    await database.execute(`
        UPDATE categoria SET
            nome='${req.body.nome || jaExiste[0].nome}',
            descricao='${req.body.descricao || jaExiste[0].descricao}',
            imagem='${req.body.imagem || jaExiste[0].imagem}'
        WHERE id='${req.params.id}'
    `);

    dados.id = req.params.id;

    res.send(dados);
});

app.delete(`${BASE_URL}/:id`, async (req, res) => {
    await database.execute(`DELETE FROM categoria WHERE id='${req.params.id}'`)

    res.sendStatus(204);
});


module.exports = app;