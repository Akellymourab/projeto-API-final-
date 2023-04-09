const mysql2 = require('mysql2/promise');

async function execute(sql) {
    let conexao = await mysql2.createConnection({
        user: 'root',
        password: '4N4260821',
        database: 'drip_storie',
        host: 'localhost'         
    });

    //executa lá no mysql
    let [rows] = await conexao.execute(sql);

    return rows;
}

module.exports = {
    execute
};