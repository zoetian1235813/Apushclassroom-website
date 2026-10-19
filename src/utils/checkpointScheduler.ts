/** Only fire checkpoints crossed during playback; seeking past several opens the latest. */
export function nextCheckpoint<T extends { id: string; timestamp: number }>(checks: T[], handled: Set<string>, previous: number, current: number): T | undefined {
  if (!Number.isFinite(current) || current < previous) return undefined;
  return checks.filter(check => !handled.has(check.id) && check.timestamp > previous && check.timestamp <= current).sort((a,b) => b.timestamp-a.timestamp)[0];
}
