const database = require('../../connection/databases');

async function buscarUm(id) {
    let dados = await database.execute(`
        SELECT * FROM tb_banner WHERE id='${req.params.id}'
    `);

    return dados;
}

module.exports = {
    buscarUm,
}
