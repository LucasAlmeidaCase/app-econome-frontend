/**
 * Insere uma nova transação na tabela.
 * @param {string} descricao - Descrição da transação.
 * @param {string} tipo - Tipo de transação ('receita' ou 'despesa').
 * @param {number|string} valor - Valor da transação.
 * @param {boolean} pago - Indica se a transação já foi paga.
 */
export const insertListaTransacoes = (descricao, tipo, valor, pago, deleteTransacao) => {
  // Seleciona o corpo da tabela, onde as linhas serão inseridas
  const tbody = document.getElementById("tabelaCorpo");
  const row = tbody.insertRow();

  // Cria e insere as células correspondentes a cada campo
  const cellDescricao = row.insertCell(0);
  cellDescricao.textContent = descricao;

  const cellTipo = row.insertCell(1);
  // Formata o tipo para iniciar com letra maiúscula
  cellTipo.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1);

  const cellValor = row.insertCell(2);
  cellValor.textContent = `R$ ${parseFloat(valor).toFixed(2)}`;

  const cellPago = row.insertCell(3);
  cellPago.textContent = pago ? "Sim" : "Não";

  // Cria a célula de ações, adicionando um botão de remoção
  const cellAcoes = row.insertCell(4);
  const btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  btnRemover.classList.add("remove-btn");
  btnRemover.addEventListener("click", () => {
    removerTransacao(row, descricao, deleteTransacao);
  });
  cellAcoes.appendChild(btnRemover);
};

/**
 * Remove uma transação da tabela após confirmação do usuário.
 * @param {HTMLElement} row - A linha da tabela que será removida.
 * @param {string} descricao - Descrição da transação, usada para confirmar a remoção.
 */
export const removerTransacao = (row, descricao, deleteTransacao) => {
  if (confirm(`Tem certeza que deseja remover a transação: ${descricao}?`)) {
    deleteTransacao(descricao);
    row.remove();
    alert("Transação removida com sucesso!");
  }
};
