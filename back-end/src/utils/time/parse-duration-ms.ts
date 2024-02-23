const TIME_UNITS_IN_MS = {
  d: 24 * 60 * 60 * 1000,
  h: 60 * 60 * 1000,
  m: 60 * 1000,
  s: 1000,
};

export const parseDurationMs = (duration: string): number => {
  const match = /^(?<amount>\d+)(?<unit>[dhms])$/.exec(duration);

  if (match?.groups === undefined) {
    throw new Error(`Invalid duration: ${duration}`);
  }

  const amount = Number(match.groups.amount);
  const unit = match.groups.unit as keyof typeof TIME_UNITS_IN_MS;

  return amount * TIME_UNITS_IN_MS[unit];
};
