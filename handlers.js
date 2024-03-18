const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.use(bodyParser.json());

const db = mysql.createConnection({
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

function cadastrarEntrega(req, res) {
    const entregaForm = req.body;

    db.query('INSERT INTO entregas (solicitante_id, entregador_id, endereco, descricao, entregue) VALUES (?, ?, ?, ?, ?)',
        [entregaForm.solicitante_id, entregaForm.entregador_id, entregaForm.endereco, entregaForm.descricao, false],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }

            const id = result.insertId;
            res.status(201).json({ message: 'Entrega cadastrada com sucesso', entrega_id: id });
        });
}

function listarEntregasPendentes(req, res) {
    db.query('SELECT id, cliente, endereco, descricao_pacote, entregue FROM entregas WHERE entregue = false',
        (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }

            res.status(200).json(rows);
        });
}

function marcarEntregaConcluida(req, res) {
    const cliente = req.params.cliente;

    db.query('UPDATE entregas SET entregue = true WHERE cliente = ? AND entregue = false',
        [cliente],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }

            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'Entrega marcada como concluída' });
            } else {
                res.status(404).json({ error: 'Entrega não encontrada ou já concluída' });
            }
        });
}

function cadastrarSolicitante(req, res) {
    const solicitante = req.body;

    db.query('INSERT INTO solicitantes (nome, endereco) VALUES (?, ?)',
        [solicitante.nome, solicitante.endereco],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }

            solicitante.ID = result.insertId;
            res.status(201).json(solicitante);
        });
}


function listarSolicitantes(req, res) {
    db.query('SELECT nome, endereco FROM solicitantes', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.status(200).json(rows);
    });
}

function realizarLogin(req, res) {
    const { nome, senha } = req.body;

    db.query('SELECT COUNT(*) AS count FROM entregadores WHERE nome = ? AND senha = ?', [nome, senha], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        const count = result[0].count;
        if (count === 1) {
            res.status(200).json({ message: 'Login bem-sucedido!' });
        } else {
            res.status(401).json({ error: 'Nome de usuário ou senha incorretos' });
        }
    });
}

function cadastrarUser(req, res) {
    const { nome, CPF, senha } = req.body;

    db.query('INSERT INTO entregadores (nome, CPF, senha) VALUES (?, ?, ?)',
        [nome, CPF, senha],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }

            res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        });
}

function listarEntregadores(req, res){
    db.query("SELECT nome,CPF FROM entregadores", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.status(200).json(rows);
    });
}


module.exports = { listarEntregadores, cadastrarEntrega, listarEntregasPendentes, marcarEntregaConcluida, cadastrarSolicitante, listarSolicitantes, realizarLogin, cadastrarUser };