export function formatarData(dataString, locale = "pt-BR", timeZone = "UTC") {
  if (!dataString) return "";
  return new Date(dataString).toLocaleDateString(locale, { timeZone });
}

export function isHojeUTC(dataString) {
  if (!dataString) return false;

  const data = new Date(dataString);
  const hoje = new Date();

  return (
    data.getUTCDate() === hoje.getUTCDate() &&
    data.getUTCMonth() === hoje.getUTCMonth() &&
    data.getUTCFullYear() === hoje.getUTCFullYear()
  );
}

export function isEstaSemanaUTC(dataString) {
  if (!dataString) return false;

  // 1) parse em UTC e zere hora/minuto UTC
  const d = new Date(dataString);
  const dataUTC = new Date(Date.UTC(
    d.getUTCFullYear(),
    d.getUTCMonth(),
    d.getUTCDate()
  ));

  // 2) hoje em UTC (sem horas)
  const now = new Date();
  const hojeUTC = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  ));

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
