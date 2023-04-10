const database = require('../../connection/databases');

async function buscarUm(id) {
    let dados = await database.execute(`
        SELECT * FROM marca WHERE id='${req.params.id}'
    `);

    return dados;
}

module.exports = {
    buscarUm,
}