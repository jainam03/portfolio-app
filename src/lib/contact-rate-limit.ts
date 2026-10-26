const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestCounts = new Map<string, { count: number; resetsAt: number }>();

export function takeContactRateLimitToken(key: string, now = Date.now()) {
  requestCounts.forEach((entry, storedKey) => {
    if (entry.resetsAt <= now) requestCounts.delete(storedKey);
  });

  const current = requestCounts.get(key);
  if (!current || current.resetsAt <= now) {
    requestCounts.set(key, { count: 1, resetsAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetsAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
