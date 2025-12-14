import { encodeBase64UrlFriendly, generateRandomBase64 } from './base64.js';

export interface SidOptions {
  /**
   * Custom timestamp to use instead of current time
   */
  timestamp?: number;
  
  /**
   * Length of the random segment (default: 8)
   */
  length?: number;
}

/**
 * Generates a short ID with optional prefix and configuration
 * 
 * Format: <prefix>:<temporal-segment><random-segment>
 * 
 * @param prefix - Optional 1-4 letter prefix
 * @param options - Optional configuration
 * @returns Generated short ID
 * 
 * @example
 * ```typescript
 * const id1 = sid();
 * const id2 = sid('usr', { timestamp: Date.now(), length: 10 });
 * ```
 */
export function sid(prefix?: string, options?: SidOptions): string {
  // Validate prefix length if provided
  if (prefix !== undefined && (prefix.length < 1 || prefix.length > 4)) {
    throw new Error('Prefix must be 1-4 characters long');
  }
  
  // Get timestamp (use provided or current)
  const timestamp = options?.timestamp ?? Date.now();
  
  // Get random segment length (default to 8)
  const randomLength = options?.length ?? 8;
  
  // Generate temporal segment (URL-friendly base64 of timestamp)
  const temporalSegment = encodeBase64UrlFriendly(timestamp);
  
  // Generate random segment
  const randomSegment = generateRandomBase64(randomLength);
  
  // Combine segments
  const idBody = `${temporalSegment}${randomSegment}`;
  
  // Return with or without prefix
  return prefix ? `${prefix}:${idBody}` : idBody;
}

export default sid;
