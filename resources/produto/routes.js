const app = require('express').Router();
const database = require('../../connection/database');

const TABLE_NAME = 'tb_product';
const BASE_URL = '/products';

app.get(BASE_URL, async (req, res) => {
    let dados = await database.execute(`SELECT * FROM ${TABLE_NAME}`);

    res.send(dados);
});

app.get(`${BASE_URL}/:id`, async (req, res) => {
    let dados = await database.execute(`
        SELECT * FROM tb_banner WHERE id='${req.params.id}'
    `);

    res.send(dados[0]);
});

app.post(BASE_URL, async (req, res) => {
    let corpo = req.body;

    let sql = await database.execute(`
        INSERT INTO tb_product (nome, descricao, img_id, valor, tamanho, cor, quantidade, referencia, marca_id, estado, colecoes_id, rewies, desconto, categoria_id)
        VALUES ('${corpo.nome}', '${corpo.descricao}', '${corpo.img_id}', '${corpo.valor}', '${corpo.tamanho}', '${corpo.cor}', '${corpo.quantidade}', '${corpo.referencia}', '${corpo.marca_id}', '${corpo.estado}', '${corpo.colecoes_id}', '${corpo.rewies}', '${corpo.desconto}', '${corpo.categoria_id}')
    `);

    corpo.id = sql.insertId;

    res.send(corpo);
});

app.patch(`${BASE_URL}:id`, async (req, res) => {
    let dados = req.body;

    let jaExiste = await database.execute(`
        SELECT * FROM tb_product WHERE id='${req.params.id}'
    `);

    if (undefined === jaExiste[0]) {
        res.sendStatus(404);
        return;
    }

    await database.execute(`
        UPDATE tb_product SET 
            titulo='${req.body.titulo || jaExiste[0].titulo}',
            descricao='${req.body.descricao || jaExiste[0].descricao}',
            imagem='${req.body.imagem || jaExiste[0].imagem}'
        WHERE id='${req.params.id}'
    `);

    dados.id = req.params.id;

    res.send(dados);
});

app.delete(`${BASE_URL}/:id`, async (req, res) => {
    await database.execute(`DELETE FROM tb_product WHERE id='${req.params.id}'`)

    res.sendStatus(204);
});

module.exports = app;