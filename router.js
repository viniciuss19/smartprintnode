const express = require('express');
const { listarEntregadores, cadastrarEntrega, listarEntregasPendentes, marcarEntregaConcluida, cadastrarSolicitante, listarSolicitantes, realizarLogin, cadastrarUser } = require('./handlers');

function SetupRouter() {
    const router = express.Router();

    router.post("/entregas", cadastrarEntrega);
    router.get("/entregas", listarEntregasPendentes);
    router.put("/entregas/:cliente", marcarEntregaConcluida);
    router.post("/solicitante", cadastrarSolicitante);
    router.get("/solicitantes", listarSolicitantes);
    router.post("/login", realizarLogin);
    router.post("/cadastro", cadastrarUser);
    router.get("/entregadores", listarEntregadores);

    return router;
}

module.exports = {SetupRouter};