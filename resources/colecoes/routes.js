// const express = require('express');
// const app = express.Router();

const app = require('express').Router();
const database = require('../../connection/database');

const TABLE_NAME = 'colecoes';
const BASE_URL = '/colecoes';

app.get(BASE_URL, async (req, res) => {
    let dados = await database.execute(`SELECT * FROM ${TABLE_NAME}`);

    res.send(dados);
});

app.get(`${BASE_URL}/:id`, async (req, res) => {
    let dados = await database.execute(`
        SELECT * FROM colecoes WHERE id='${req.params.id}'
    `);

    res.send(dados[0]);
});

app.post(BASE_URL, async (req, res) => {
    let corpo = req.body;

    let sql = await database.execute(`
        INSERT INTO colecoes (nome, desconto, imagem)
        VALUES ('${corpo.nome}', '${corpo.desconto}', '${corpo.imagem}')
    `);

    corpo.id = sql.insertId;
    
    res.send(corpo);
});

app.patch(`${BASE_URL}/:id`, async (req, res) => {
    let dados = req.body;

    let jaExiste = await database.execute(`
        SELECT * FROM colecoes WHERE id='${req.params.id}'
    `);

    //testando se realmente se existe algum banner com aquele id
    if (undefined === jaExiste[0]) {
        res.sendStatus(404);
        return;
    }

    await database.execute(`
        UPDATE colecoes SET
            nome='${req.body.nome || jaExiste[0].nome}',
            desconto='${req.body.desconto || jaExiste[0].desconto}',
            imagem='${req.body.imagem || jaExiste[0].imagem}'
        WHERE id='${req.params.id}'
    `);

    dados.id = req.params.id;

    res.send(dados);
});

app.delete(`${BASE_URL}/:id`, async (req, res) => {
    await database.execute(`DELETE FROM colecoes WHERE id='${req.params.id}'`)

    res.sendStatus(204);
});



module.exports = app;