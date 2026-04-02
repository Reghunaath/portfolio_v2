const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function computeDuration(period: string): string {
  const parts = period.split(" – ");
  if (parts.length !== 2) return "";

  const parse = (s: string): { year: number; month: number } | null => {
    const [mon, yr] = s.trim().split(" ");
    const month = MONTHS.indexOf(mon);
    const year = parseInt(yr, 10);
    if (month === -1 || isNaN(year)) return null;
    return { year, month };
  };

  const start = parse(parts[0]);
  const end = parse(parts[1]);

  if (!start || !end) {
    // Fallback: year-only format "2024 – 2026"
    const startYear = parseInt(parts[0].trim(), 10);
    const endYear = parseInt(parts[1].trim(), 10);
    if (isNaN(startYear) || isNaN(endYear)) return "";
    const yrs = endYear - startYear;
    return yrs === 1 ? "1 yr" : `${yrs} yrs`;
  }

  let months = (end.year - start.year) * 12 + (end.month - start.month) + 1;
  if (months < 1) months = 1;

  const yrs = Math.floor(months / 12);
  const mos = months % 12;

  if (yrs === 0) return mos === 1 ? "1 mo" : `${mos} mos`;
  if (mos === 0) return yrs === 1 ? "1 yr" : `${yrs} yrs`;
  return `${yrs} yr${yrs > 1 ? "s" : ""} ${mos} mo${mos > 1 ? "s" : ""}`;
}
