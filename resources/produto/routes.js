const app = require('express').Router();
const database = require('../../connection/databases');

const TABLE_NAME = 'tb_produto';
const BASE_URL = '/produtos';

app.get(BASE_URL, async (req, res) => {
    let dados = await database.execute(`SELECT * FROM ${TABLE_NAME}`);

    res.send(dados);
});

app.get(`${BASE_URL}/:id`, async (req, res) => {
    let dados = await database.execute(`
        SELECT * FROM tb_produto WHERE id='${req.params.id}'
    `);

    res.send(dados[0]);
});

app.post(BASE_URL, async (req, res) => {
    let corpo = req.body;

    let sql = await database.execute(`
        INSERT INTO tb_produto (nome, descricao, img_id, valor, tamanho, cor, quantidade, referencia, marca_id, estado, colecoes_id, rewies, desconto, categoria_id)
        VALUES ('${corpo.nome}', '${corpo.descricao}', '${corpo.img_id}', '${corpo.valor}', '${corpo.tamanho}', '${corpo.cor}', '${corpo.quantidade}', '${corpo.referencia}', '${corpo.marca_id}', '${corpo.estado}', '${corpo.colecoes_id}', '${corpo.rewies}', '${corpo.desconto}', '${corpo.categoria_id}')
    `);

    corpo.id = sql.insertId;

    res.send(corpo);
});

app.patch(`${BASE_URL}/:id`, async (req, res) => {
    let dados = req.body;

    let jaExiste = await database.execute(`
        SELECT * FROM tb_produto WHERE id='${req.params.id}'
    `);

    if (undefined === jaExiste[0]) {
        res.sendStatus(404);
        return;
    }

    await database.execute(`
        UPDATE tb_produto SET 
            nome='${req.body.nome || jaExiste[0].nome}',
            descricao='${req.body.descricao || jaExiste[0].descricao}',
            img_id='${req.body.img_id || jaExiste[0].img_id}',
            valor='${req.body.valor || jaExiste[0].valor}',
            tamanho='${req.body.tamanho || jaExiste[0].tamanho}',
            cor='${req.body.cor || jaExiste[0].cor}',
            quantidade='${req.body.quantidade || jaExiste[0].quantidade}',
            referencia='${req.body.referencia || jaExiste[0].referencia}',
            marca_id='${req.body.marca_id || jaExiste[0].marca_id}',
            estado='${req.body.estado || jaExiste[0].estado}',
            colecoes_id='${req.body.colecoes_id || jaExiste[0].colecoes_id}',
            rewies='${req.body.rewies || jaExiste[0].rewies}',
            desconto='${req.body.desconto || jaExiste[0].desconto}',
            categoria_id='${req.body.categoria_id || jaExiste[0].categoria_id}'
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