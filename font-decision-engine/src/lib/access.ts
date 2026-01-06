// Centralized logic for determining premium status
// This ensures frontend, backend, and API all share the same "Gatekeeper" logic.

export interface Tag {
    id?: string;
    name: string;
    is_premium?: boolean;
    polarity?: number; // from emotion_tags table
}

export function isPremiumTag(tag: { is_premium?: boolean; polarity?: number }): boolean {
    // Logic 1: Explicit is_premium flag (if added to DB later)
    if (tag.is_premium) return true;

    // Logic 2: High polarity (Strong emotions = High Value/Risk)
    // Absolute polarity >= 2 is considered premium context
    if (tag.polarity && Math.abs(tag.polarity) >= 2) return true;

    return false;
}

export function hasPremiumAccess(userPlan: string): boolean {
    return ['team', 'company', 'enterprise'].includes(userPlan);
}

export function requirePremium(tags: Tag[]): boolean {
    return tags.some(t => isPremiumTag(t));
}
