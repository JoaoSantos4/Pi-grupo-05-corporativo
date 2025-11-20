const mysql = require('mysql2');
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'DeD@8689',
  database: 'gestao',
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
        return;
    }
    console.log("MySQL conectado com sucesso (corporativo)");
});

module.exports = db;