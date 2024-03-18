const entregas = [];

const Entrega = {
    ID: 0,
    solicitante: "",
    endereco: "",
    DescricaoPacote: "",
    entregadoriD: 0,
    entregue: false
};

const EntregaForm = {
    solicitante_id: 0,
    entregador_id: 0,
    descricao: "",
    endereco: "",
    produto: ""
};

const Pacote = {
    descricao: "",
    peso: 0
};

const Solicitante = {
    ID: 0,
    Nome: "",
    endereco: ""
};

const Entregador = {
    ID: 0,
    CPF: 0,
    Telefone: "",
    Nome: ""
};

module.exports = { entregas, Entrega, EntregaForm, Pacote, Solicitante, Entregador };