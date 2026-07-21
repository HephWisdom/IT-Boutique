export type SubmissionResult = { ok: true; reference: string; message: string } | { ok: false; message: string; queued: true };

function makeIdempotencyKey(prefix: string) {
  const random = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${random}`;
}

export async function submitWithRecovery(endpoint: string, data: Record<string, unknown>, file?: File): Promise<SubmissionResult> {
  const slot = `pending-submission:${endpoint}`;
  const serialized = JSON.stringify(data);
  type PendingSubmission = { key?: string; serialized?: string };
  let previous: PendingSubmission | null;
  try { previous = JSON.parse(localStorage.getItem(slot) || 'null') as PendingSubmission | null; } catch { previous = null; }
  const key = previous?.serialized === serialized && previous.key ? previous.key : makeIdempotencyKey(endpoint.includes('talent') ? 'TAL' : 'ENQ');
  const draft = { endpoint, data, key, savedAt: new Date().toISOString() };
  localStorage.setItem(slot, JSON.stringify({ ...draft, serialized }));
  try {
    const body = new FormData();
    body.append('payload', JSON.stringify(data));
    if (file) body.append('attachment', file);
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Idempotency-Key': key }, body });
    const result = await response.json() as { reference?: string; message?: string };
    if (!response.ok || !result.reference) throw new Error(result.message || 'The submission could not be confirmed.');
    localStorage.removeItem(slot);
    return { ok: true, reference: result.reference, message: result.message || 'Submission received.' };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : 'We could not reach the server.', queued: true };
  }
}
