const express = require('express');
const bodyParser = require('body-parser');
const { conectarBancoDeDados } = require('./db'); // Importe as funções conforme necessário
const { SetupRouter } = require('./router')

const app = express();
const port = 3010;


app.use(express.json())

// Conecta ao banco de dados
const db = conectarBancoDeDados();

// Configura as rotas
const router = SetupRouter();
app.use(router);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});