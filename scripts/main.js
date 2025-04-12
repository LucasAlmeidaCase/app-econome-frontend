import {
  getTransacoes,
  addTransacao,
  deleteTransacao,
} from "./api/transacoesAPI.js";
import { insertListaTransacoes } from "./ui/transacoesUI.js";

window.onload = () => {
  getTransacoes((descricao, tipo, valor, pago) => {
    insertListaTransacoes(descricao, tipo, valor, pago, deleteTransacao);
  });

  const botaoAdicionar = document.getElementById("btnAdicionar");
  if (botaoAdicionar) {
    botaoAdicionar.addEventListener("click", () => novaTransacao());
  }
};

function novaTransacao() {
  // Obtém os valores dos campos com os IDs atualizados
  const descricao = document.getElementById("descricao").value;
  const tipo = document.getElementById("tipo_transacao").value;
  const valor = document.getElementById("valor").value;
  const pago = document.getElementById("pago").checked;

  // Validação simples dos campos
  if (!descricao || isNaN(valor) || valor === "") {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  // Insere a transação na tabela e envia para a API
  insertListaTransacoes(descricao, tipo, valor, pago, deleteTransacao);
  addTransacao(descricao, tipo, valor, pago);
  alert("Transação adicionada com sucesso!");

  // Limpa os campos do formulário
  limparCampos();
}

/**
 * Limpa os campos do formulário para nova entrada.
 */
function limparCampos() {
  document.getElementById("descricao").value = "";
  document.getElementById("tipo_transacao").value = "Receita"; // Valor padrão definido conforme o select
  document.getElementById("valor").value = "";
  document.getElementById("pago").checked = false;
}
