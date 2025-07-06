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

export function formatarData(dataString, locale = "pt-BR", timeZone = "UTC") {
  if (!dataString) return "";
  return new Date(dataString).toLocaleDateString(locale, { timeZone });
}
