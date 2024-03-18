const mysql = require('mysql');

let db;

function conectarBancoDeDados() {
    db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'smartprintdelivery'
    });

    db.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
            return;
        }
        console.log('Conectou ao banco de dados');
    });

    return db;
}

module.exports = {
    conectarBancoDeDados
};