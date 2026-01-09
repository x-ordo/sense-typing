// scripts/crawlers/utils/rate-limiter.ts
// Rate limiting utility for web crawling

/**
 * Simple rate limiter for API/web requests
 * Implements token bucket algorithm with exponential backoff
 */
export class RateLimiter {
  private tokens: number;
  private lastRefill: number;
  private readonly maxTokens: number;
  private readonly refillRate: number; // tokens per second
  private backoffMultiplier: number = 1;

  constructor(
    maxTokens: number = 1,
    refillRate: number = 1 // 1 request per second by default
  ) {
    this.maxTokens = maxTokens;
    this.refillRate = refillRate;
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
  }

  /**
   * Wait until a token is available
   */
  async acquire(): Promise<void> {
    this.refill();

    if (this.tokens >= 1) {
      this.tokens -= 1;
      return;
    }

    // Calculate wait time
    const waitTime = ((1 - this.tokens) / this.refillRate) * 1000 * this.backoffMultiplier;
    await this.sleep(waitTime);

    this.refill();
    this.tokens -= 1;
  }

  /**
   * Report a successful request (reset backoff)
   */
  success(): void {
    this.backoffMultiplier = 1;
  }

  /**
   * Report a rate limit hit (increase backoff)
   */
  rateLimited(): void {
    this.backoffMultiplier = Math.min(this.backoffMultiplier * 2, 32);
    console.log(`Rate limited. Backoff multiplier: ${this.backoffMultiplier}x`);
  }

  /**
   * Refill tokens based on elapsed time
   */
  private refill(): void {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.maxTokens, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
  }

  /**
   * Sleep for specified milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Delay execution for specified milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    initialDelayMs?: number;
    maxDelayMs?: number;
    shouldRetry?: (error: Error) => boolean;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelayMs = 1000,
    maxDelayMs = 30000,
    shouldRetry = () => true,
  } = options;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries || !shouldRetry(lastError)) {
        throw lastError;
      }

      const delayMs = Math.min(
        initialDelayMs * Math.pow(2, attempt),
        maxDelayMs
      );

      console.log(`Attempt ${attempt + 1} failed. Retrying in ${delayMs}ms...`);
      await delay(delayMs);
    }
  }

  throw lastError;
}
