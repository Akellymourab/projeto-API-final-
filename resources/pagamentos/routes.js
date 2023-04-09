const app = require('express').Router();
const database = require('../../connection/database');

const TABLE_NAME = 'forma_pagamento';
const BASE_URL = '/pagamentos';

app.get(BASE_URL, async (req, res) => {
    let dados = await database.execute(`SELECT * FROM ${TABLE_NAME}`);

    res.send(dados);
});

app.get(`${BASE_URL}/:id`, async (req, res) => {
    let dados = await database.execute(`
        SELECT * FROM forma_pagamento WHERE id='${req.params.id}'
    `);

    res.send(dados[0]);
});

app.post(BASE_URL, async (req, res) => {
    let corpo = req.body;

    let sql = await database.execute(`
        INSERT INTO forma_pagamento (nome, descricao)
        VALUES ('${corpo.nome}', '${corpo.descricao}')
    `);

    corpo.id = sql.insertId;
    
    res.send(corpo);
});



app.patch(`${BASE_URL}/:id`, async (req, res) => {
    let dados = req.body;

     let jaExiste = await database.execute(`
        SELECT * FROM forma_pagamento WHERE id='${req.params.id}'
    `);

    if (undefined === jaExiste[0]) {
        res.sendStatus(404);
        return;
    }

    await database.execute(`
    UPDATE forma_pagamento SET
        nome='${req.body.nome || jaExiste[0].nome}',
        descricao='${req.body.descricao || jaExiste[0].descricao}'
    WHERE id='${req.params.id}'
`);

dados.id = req.params.id;

res.send(dados);
});
app.delete(`${BASE_URL}/:id`, async (req, res) => {
    await database.execute(`DELETE FROM forma_pagamento WHERE id='${req.params.id}'`)

    res.send('Forma de pagamento excluída com sucesso!');
});

module.exports = app;



