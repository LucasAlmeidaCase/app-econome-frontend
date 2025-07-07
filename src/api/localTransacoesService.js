import database from '../../public/database.json';

export async function fetchLocalTransacoes() {
  return database.transacoes;
}

export async function createLocalTransacao(transacao) {
  // Simula adição - na prática só modifica o estado local
  return transacao;
}

export async function removeLocalTransacao(descricao) {
  // Simula remoção - na prática só modifica o estado local
  console.log('transação removida: ', descricao)
  return { success: true };
}