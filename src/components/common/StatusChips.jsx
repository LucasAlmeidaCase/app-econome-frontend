import { Chip, Tooltip, IconButton, Box } from "@mui/material";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import { alpha, useTheme } from "@mui/material/styles";

// Função utilitária para gerar um estilo "soft badge" consistente
function softStyle(theme, base, options = {}) {
  const { tone = 'main' } = options;
  const colorObj = theme.palette[base] || theme.palette.grey;
  const main = colorObj[tone] || colorObj.main || '#666';
  return {
    px: 1.2,
    py: 0.3,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 0.4,
    borderRadius: 1.5,
    textTransform: 'uppercase',
    bgcolor: alpha(main, 0.12),
    color: base === 'warning' ? theme.palette.warning.dark : main,
    border: `1px solid ${alpha(main, 0.28)}`,
    backdropFilter: 'blur(6px)',
    lineHeight: 1.2
  };
}

// Situação -> cores e ícones
const situacaoMeta = (theme) => ({
  PENDENTE: { icon: <ScheduleRoundedIcon fontSize="inherit" />, sx: softStyle(theme, 'warning') },
  FATURADO: { icon: <TaskAltRoundedIcon fontSize="inherit" />, sx: softStyle(theme, 'primary') },
  CANCELADO: { icon: <BlockRoundedIcon fontSize="inherit" />, sx: softStyle(theme, 'error') },
});

// Tipo (Pedido / Transação)
const tipoMeta = (theme) => ({
  RECEITA: { icon: <ArrowUpwardRoundedIcon fontSize="inherit" />, sx: softStyle(theme, 'success') },
  ENTRADA: { icon: <ArrowUpwardRoundedIcon fontSize="inherit" />, sx: softStyle(theme, 'success') },
  DESPESA: { icon: <ArrowDownwardRoundedIcon fontSize="inherit" />, sx: softStyle(theme, 'error') },
  SAIDA: { icon: <ArrowDownwardRoundedIcon fontSize="inherit" />, sx: softStyle(theme, 'error') },
});

export function SituacaoChip({ value }) {
  const theme = useTheme();
  if (!value) return null;
  const meta = situacaoMeta(theme)[value] || { sx: softStyle(theme, 'grey') };
  return (
    <Chip
      size="small"
      label={value}
      icon={meta.icon || null}
      sx={{ ...meta.sx, '.MuiChip-icon': { fontSize: 16, ml: 0.2 } }}
      variant="outlined"
    />
  );
}

export function TipoChip({ value, labelOverride }) {
  const theme = useTheme();
  if (!value) return null;
  const upper = String(value).toUpperCase();
  const meta = tipoMeta(theme)[upper] || { sx: softStyle(theme, 'info') };
  return (
    <Chip
      size="small"
      label={labelOverride || value}
      icon={meta.icon || null}
      sx={{ ...meta.sx, '.MuiChip-icon': { fontSize: 16, ml: 0.2 } }}
      variant="outlined"
    />
  );
}

// Componente de pagamento: apenas ícone circular sem texto
export function PagoChip({ pago, onToggle, tooltipOverride }) {
  const theme = useTheme();
  const paid = Boolean(pago);
  const icon = paid ? <MonetizationOnRoundedIcon /> : <PendingActionsRoundedIcon />;
  const paletteKey = paid ? 'success' : 'warning';
  const main = theme.palette[paletteKey].main;
  const bg = alpha(main, 0.15);
  const hoverBg = alpha(main, 0.28);
  const baseTitle = paid
    ? 'Pagamento registrado'
    : 'Em aberto (aguardando pagamento)';
  const interactiveHint = onToggle
    ? paid
      ? ' — clique para marcar como em aberto'
      : ' — clique para marcar como pago'
    : '';
  const title = tooltipOverride || (baseTitle + interactiveHint);

  const button = (
    <IconButton
      size="small"
      onClick={onToggle}
      disableRipple={!onToggle}
      aria-label={baseTitle}
      aria-pressed={paid}
      sx={{
        width: 32,
        height: 32,
        color: main,
        bgcolor: bg,
        transition: 'all 0.18s ease',
        boxShadow: 'inset 0 0 0 1px ' + alpha(main, 0.25),
        '&:hover': onToggle ? { bgcolor: hoverBg } : undefined,
        '&:active': { transform: 'scale(0.92)' },
      }}
    >
      <Box sx={{ display: 'flex', fontSize: 18 }}>{icon}</Box>
    </IconButton>
  );

  return <Tooltip title={title}>{button}</Tooltip>;
}

export function PagoIcon({ pago }) {
  // Fallback semântico se ainda precisarmos de um marcador inline
  return pago ? <MonetizationOnRoundedIcon color="success" fontSize="small" /> : <PendingActionsRoundedIcon color="warning" fontSize="small" />;
}

export default { SituacaoChip, TipoChip, PagoChip };
