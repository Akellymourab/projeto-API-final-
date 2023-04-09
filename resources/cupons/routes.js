const app = require('express').Router();
const database = require('../../connection/database');

const TABLE_NAME = 'tb_cupons';
const BASE_URL = '/cupons';

app.get(BASE_URL, async (req, res) => {
    let dados = await database.execute(`SELECT * FROM ${TABLE_NAME}`);

    res.send(dados);
});

app.get(`${BASE_URL}/:id`, async (req, res) => {
    let dados = await database.execute(`
        SELECT * FROM tb_cupons WHERE id='${req.params.id}'
    `);

    res.send(dados[0]);
});

app.post(BASE_URL, async (req, res) => {
    let corpo = req.body;

    let sql = await database.execute(`
        INSERT INTO tb_cupons (produto_id, cliente_id, desconto)
        VALUES ('${corpo.produto_id}', '${corpo.cliente_id}', '${corpo.desconto}')
    `);

    corpo.id = sql.insertId;
    
    res.send(corpo);
});

app.patch(`${BASE_URL}/:id`, async (req, res) => {
    let dados = req.body;

     let jaExiste = await database.execute(`
        SELECT * FROM tb_cupons WHERE id='${req.params.id}'
    `);

    if (undefined === jaExiste[0]) {
        res.sendStatus(404);
        return;
    }

    await database.execute(`
    UPDATE tb_cupons SET
        produto_id='${req.body.produto_id || jaExiste[0].produto_id}',
        cliente_id='${req.body.cliente_id || jaExiste[0].cliente_id}',
        desconto='${req.body.desconto || jaExiste[0].desconto}'
    WHERE id='${req.params.id}'
`);

dados.id = req.params.id;

res.send(dados);
});



app.delete(`${BASE_URL}/:id`, async (req, res) => {
    await database.execute(`DELETE FROM tb_cupons WHERE id='${req.params.id}'`)

    res.sendStatus(204);
});

module.exports = app;



