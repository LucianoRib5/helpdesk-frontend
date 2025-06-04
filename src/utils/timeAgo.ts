export function timeAgo(dateISO: string): string {
  const date = new Date(dateISO);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { label: 'ano', seconds: 365 * 24 * 60 * 60 },
    { label: 'mês', seconds: 30 * 24 * 60 * 60 },
    { label: 'semana', seconds: 7 * 24 * 60 * 60 },
    { label: 'dia', seconds: 24 * 60 * 60 },
    { label: 'hora', seconds: 60 * 60 },
    { label: 'minuto', seconds: 60 },
    { label: 'segundo', seconds: 1 },
  ];

  for (const unit of units) {
    const value = Math.floor(diffInSeconds / unit.seconds);
    if (value > (unit.label === 'segundo' ? 5 : 0)) {
      return `Há ${value} ${unit.label}${value > 1 ? (unit.label === 'mês' ? 'es' : 's') : ''}`;
    }
  }

  return 'Há poucos segundos';
}
