/** Mandatory checkpoints: seeking cannot skip an earlier unanswered checkpoint. */
export function nextCheckpoint<T extends { id: string; timestamp: number }>(checks: T[], handled: Set<string>, _previous: number, current: number): T | undefined {
  if (!Number.isFinite(current)) return undefined;
  return checks.filter(check => !handled.has(check.id) && check.timestamp <= current).sort((a,b) => a.timestamp-b.timestamp)[0];
}
