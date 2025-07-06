export function formatarData(dataString, locale = "pt-BR", timeZone = "UTC") {
  if (!dataString) return "";
  return new Date(dataString).toLocaleDateString(locale, { timeZone });
}

export function isHojeUTC(dataString, referencia = new Date()) {
  if (!dataString) return false;

  // Converte a data da transação para UTC
  const dataTransacao = new Date(dataString);
  const transacaoUTC = new Date(
    Date.UTC(
      dataTransacao.getUTCFullYear(),
      dataTransacao.getUTCMonth(),
      dataTransacao.getUTCDate()
    )
  );

  // Converte a data de referência para UTC
  const referenciaUTC = new Date(
    Date.UTC(
      referencia.getUTCFullYear(),
      referencia.getUTCMonth(),
      referencia.getUTCDate()
    )
  );

  return transacaoUTC.getTime() === referenciaUTC.getTime();
}

export function isEstaSemanaUTC(dataString) {
  if (!dataString) return false;

  // 1) parse em UTC e zere hora/minuto UTC
  const d = new Date(dataString);
  const dataUTC = new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
  );

  // 2) hoje em UTC (sem horas)
  const now = new Date();
  const hojeUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );

  // 3) dia da semana em UTC (0 = domingo … 6 = sábado)
  const diaSemana = hojeUTC.getUTCDay();

  // 4) primeiro e último dia em UTC
  const primeiroDia = new Date(hojeUTC);
  primeiroDia.setUTCDate(hojeUTC.getUTCDate() - diaSemana);

  const ultimoDia = new Date(primeiroDia);
  ultimoDia.setUTCDate(primeiroDia.getUTCDate() + 6);

  return dataUTC >= primeiroDia && dataUTC <= ultimoDia;
}

export function isMesAtual(dataString) {
  if (!dataString) return false;
  const data = new Date(dataString);
  const hoje = new Date();

  return (
    data.getUTCFullYear() === hoje.getUTCFullYear() &&
    data.getUTCMonth() === hoje.getUTCMonth()
  );
}

export function isEntrePeriodo(dataString, inicio, fim) {
  if (!dataString || !inicio || !fim) return false;

  const data = new Date(dataString);
  const dataInicio = new Date(inicio);
  const dataFim = new Date(fim);
  dataFim.setHours(23, 59, 59, 999); // incluir o dia inteiro

  return data >= dataInicio && data <= dataFim;
}

// funções de auxílio para navegação:

// retorna [inicio, fim] da semana do parâmetro date
export function getSemanaRange(date = new Date()) {
  const hojeUTC = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  const diaSemana = hojeUTC.getUTCDay();
  const inicio = new Date(hojeUTC);
  inicio.setUTCDate(hojeUTC.getUTCDate() - diaSemana);
  const fim = new Date(inicio);
  fim.setUTCDate(inicio.getUTCDate() + 6);
  return [inicio, fim];
}

// retorna [inicio, fim] do mês do parâmetro date
export function getMesRange(date = new Date()) {
  const ano = date.getFullYear();
  const mes = date.getMonth();
  const inicio = new Date(ano, mes, 1);
  const fim = new Date(ano, mes + 1, 0, 23, 59, 59, 999);
  return [inicio, fim];
}

// avança ou retrocede o filtro
// ex.: { tipo: 'mesAtual', dataInicio, dataFim } → próximo mês
export function shiftPeriod(filtro, direction = +1) {
  const { tipo, dataInicio, dataFim } = filtro;

  // baseDate p/ todos os casos: se dataInicio existe, use-a; senão hoje
  const today = new Date();
  const baseDate = dataInicio ? parseLocalDate(dataInicio) : today;

  if (tipo === "hoje") {
    const d = new Date(baseDate);
    d.setUTCDate(d.getUTCDate() + direction);
    return {
      tipo,
      dataInicio: d.toISOString().split("T")[0], // Formato YYYY-MM-DD
      dataFim: null,
    };
  }

  if (tipo === "semana") {
    // pega range da semana que contém baseDate
    const [ini, fim] = getSemanaRange(baseDate);
    // desloca as duas datas
    ini.setDate(ini.getDate() + direction * 7);
    fim.setDate(fim.getDate() + direction * 7);
    return {
      tipo,
      dataInicio: toISODate(ini),
      dataFim: toISODate(fim),
    };
  }

  if (tipo === "mesAtual") {
    // começa do primeiro dia do mês de baseDate
    const d = new Date(
      baseDate.getFullYear(),
      baseDate.getMonth() + direction,
      1
    );
    const [ini, fim] = getMesRange(d);
    return {
      tipo,
      dataInicio: toISODate(ini),
      dataFim: toISODate(fim),
    };
  }

  if (tipo === "periodoPersonalizado" && dataInicio && dataFim) {
    const ini = parseLocalDate(dataInicio);
    const fim = parseLocalDate(dataFim);
    ini.setDate(ini.getDate() + direction);
    fim.setDate(fim.getDate() + direction);
    return {
      tipo,
      dataInicio: toISODate(ini),
      dataFim: toISODate(fim),
    };
  }

  return filtro; // "todos"
}

export function toISODate(date) {
  if (!(date instanceof Date)) return date;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseLocalDate(dateString) {
  if (!dateString) return new Date();
  // dateString no formato "YYYY-MM-DD"
  const [y, m, d] = dateString.split("-").map(Number);
  return new Date(y, m - 1, d);
}
