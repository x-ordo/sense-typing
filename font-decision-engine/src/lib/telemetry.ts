export type TelemetryEvent = 
  | 'AI_ANALYSIS_EXECUTED'
  | 'AI_HIGH_RISK_DETECTED'
  | 'PAYWALL_LOCKED'
  | 'PAYWALL_UNLOCKED'
  | 'ENTERPRISE_LEAD_SUBMITTED';

export function logTelemetry(event: TelemetryEvent, metadata?: Record<string, unknown>) {
    // For MVP/Cloudflare Pages, we log to console which Cloudflare captures.
    // In production, this would dispatch to a service like PostHog or Supabase.
    
    const timestamp = new Date().toISOString();
    
    // eslint-disable-next-line no-console -- Intentional telemetry logging
    console.log(`[SenseTyping Telemetry]`, JSON.stringify({
        timestamp,
        event,
        metadata,
        environment: process.env.NODE_ENV
    }));
}
