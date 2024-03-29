const app = require('express').Router();
const database = require('../../connection/databases');

const TABLE_NAME = 'tb_pedidos';
const BASE_URL = '/pedidos';

app.get(BASE_URL, async (req, res) => {
    let dados = await database.execute(`SELECT * FROM ${TABLE_NAME}`);

    res.send(dados);
});

app.get(`${BASE_URL}/:id`, async (req, res) => {
    let dados = await database.execute(`
        SELECT * FROM tb_pedidos WHERE id='${req.params.id}'
    `);

    res.send(dados[0]);
});

app.post(BASE_URL, async (req, res) => {
    let corpo = req.body;

    let sql = await database.execute(`
        INSERT INTO tb_pedidos (pagamento_id, cliente_id, carrinho_id)
        VALUES ('${corpo.pagamento_id}', '${corpo.cliente_id}', '${corpo.carrinho_id}')
    `);

    corpo.id = sql.insertId;

    res.send(corpo);
});

app.patch(`${BASE_URL}/:id`, async (req, res) => {
    let dados = req.body;

    let jaExiste = await database.execute(`
        SELECT * FROM tb_pedidos WHERE id='${req.params.id}'
    `);

    if (undefined === jaExiste[0]) {
        res.sendStatus(404);
        return;
    }

    await database.execute(`
        UPDATE tb_pedidos SET 
            pagamento_id='${req.body.pagamento_id || jaExiste[0].pagamento_id}',
            cliente_id='${req.body.cliente_id || jaExiste[0].cliente_id}',
            carrinho_id='${req.body.carrinho_id || jaExiste[0].carrinho_id}'
        WHERE id='${req.params.id}'
    `);

    dados.id = req.params.id;

    res.send(dados);
});

app.delete(`${BASE_URL}/:id`, async (req, res) => {
    await database.execute(`DELETE FROM tb_pedidos WHERE id='${req.params.id}'`)

    res.sendStatus(204);
});

module.exports = app;