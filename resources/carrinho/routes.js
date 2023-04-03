const app = require('express').Router();
const database = require('../../connection/database');

const TABLE_NAME = 'tb_carrinho';
const BASE_URL = '/carrinhos';

app.get(BASE_URL, async (req, res) => {
    let dados = await database.execute(`SELECT * FROM ${TABLE_NAME}`);

    res.send(dados);
});

app.get(`${BASE_URL}/:id`, async (req, res) => {
    let dados = await database.execute(`
        SELECT * FROM tb_carrinho WHERE id='${req.params.id}'
    `);

    res.send(dados[0]);
});

app.post(BASE_URL, async (req, res) => {
    let corpo = req.body;

    let sql = await database.execute(`
        INSERT INTO tb_carrinho (produto_id, cliente_id, cupons_id, valor)
        VALUES ('${corpo.produto_id}', '${corpo.cliente_id}', '${corpo.cupons_id}', '${corpo.valor}')
    `);

    corpo.id = sql.insertId;

    res.send(corpo);
});

app.patch(`${BASE_URL}/:id`, async (req, res) => {
    let dados = req.body;

    let jaExiste = await database.execute(`
        SELECT * FROM tb_carrinho WHERE id='${req.params.id}'
    `);

    if (undefined === jaExiste[0]) {
        res.sendStatus(404);
        return;
    }

    await database.execute(`
        UPDATE tb_produto SET 
            produto_id='${req.body.produto_id || jaExiste[0].produto_id}',
            cliente_id='${req.body.cliente_id || jaExiste[0].cliente_id}',
            cupons_id='${req.body.cupons_id || jaExiste[0].cupons_id}',
            valor='${req.body.valor || jaExiste[0].valor}'
        WHERE id='${req.params.id}'
    `);

    dados.id = req.params.id;

    res.send(dados);
});

app.delete(`${BASE_URL}/:id`, async (req, res) => {
    await database.execute(`DELETE FROM tb_produto WHERE id='${req.params.id}'`)

    res.sendStatus(204);
});

module.exports = app;