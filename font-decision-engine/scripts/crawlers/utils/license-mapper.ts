// scripts/crawlers/utils/license-mapper.ts
// Maps various license formats to standardized types

export type LicenseType = 'free' | 'commercial' | 'subscription' | 'ofl';

/**
 * Map raw license text to standardized license type
 */
export function mapLicenseType(licenseText: string): LicenseType {
  const text = licenseText.toLowerCase();

  // Open Font License
  if (
    text.includes('ofl') ||
    text.includes('open font license') ||
    text.includes('오픈폰트') ||
    text.includes('sil open font')
  ) {
    return 'ofl';
  }

  // Commercial license required
  if (
    text.includes('유료') ||
    text.includes('상업용 라이선스') ||
    text.includes('구매') ||
    text.includes('commercial license')
  ) {
    return 'commercial';
  }

  // Subscription model
  if (
    text.includes('구독') ||
    text.includes('subscription') ||
    text.includes('월정액')
  ) {
    return 'subscription';
  }

  // Free (default for Korean free font sites like noonnu)
  if (
    text.includes('무료') ||
    text.includes('free') ||
    text.includes('자유롭게') ||
    text.includes('상업적 이용 가능') ||
    text.includes('상업용 무료')
  ) {
    return 'free';
  }

  // Default to free for noonnu fonts (they verify licenses)
  return 'free';
}

/**
 * Parse permission string from noonnu format
 * Returns boolean based on Korean text indicators
 */
export function parsePermission(text: string): boolean {
  const lower = text.toLowerCase().trim();

  // Positive indicators
  if (
    lower === 'o' ||
    lower === '가능' ||
    lower === '허용' ||
    lower === '사용가능' ||
    lower === 'yes' ||
    lower === 'true' ||
    lower.includes('가능')
  ) {
    return true;
  }

  // Negative indicators
  if (
    lower === 'x' ||
    lower === '불가' ||
    lower === '불허' ||
    lower === '사용불가' ||
    lower === 'no' ||
    lower === 'false' ||
    lower.includes('불가') ||
    lower.includes('제한')
  ) {
    return false;
  }

  // Default to true for ambiguous cases on free font sites
  return true;
}

/**
 * Extract weight count from text like "9가지 굵기" or "Bold, Regular, Light"
 */
export function extractWeightCount(text: string): number | undefined {
  // Korean format: "9가지 굵기", "4가지"
  const koreanMatch = text.match(/(\d+)\s*가지/);
  if (koreanMatch) {
    return parseInt(koreanMatch[1], 10);
  }

  // English format: count comma-separated weights
  const weights = ['thin', 'extralight', 'light', 'regular', 'medium', 'semibold', 'bold', 'extrabold', 'black'];
  const lower = text.toLowerCase();
  let count = 0;
  for (const weight of weights) {
    if (lower.includes(weight)) count++;
  }

  return count > 0 ? count : undefined;
}

/**
 * Map category text to standardized category
 */
export function mapCategory(categoryText: string): string {
  const text = categoryText.toLowerCase();

  // Sans-serif / Gothic
  if (
    text.includes('고딕') ||
    text.includes('산세리프') ||
    text.includes('sans') ||
    text.includes('돋움')
  ) {
    return '산세리프';
  }

  // Serif / Myeongjo
  if (
    text.includes('명조') ||
    text.includes('세리프') ||
    text.includes('serif') ||
    text.includes('바탕') ||
    text.includes('부리')
  ) {
    return '세리프';
  }

  // Handwriting
  if (
    text.includes('손글씨') ||
    text.includes('필기') ||
    text.includes('캘리') ||
    text.includes('handwriting') ||
    text.includes('script')
  ) {
    return '손글씨';
  }

  // Display / Decorative
  if (
    text.includes('장식') ||
    text.includes('제목') ||
    text.includes('display') ||
    text.includes('decorative') ||
    text.includes('타이틀')
  ) {
    return '장식체';
  }

  // Pixel / Retro
  if (
    text.includes('픽셀') ||
    text.includes('레트로') ||
    text.includes('pixel') ||
    text.includes('bitmap')
  ) {
    return '픽셀';
  }

  return '기타';
}

/**
 * Generate slug from font name
 */
export function generateSlug(name: string, sourceId: string): string {
  // Sanitize name for URL
  const sanitized = name
    .toLowerCase()
    .replace(/[^\w\s가-힣-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);

  return `noonnu-${sourceId}`;
}

/**
 * Extract tags from description and category
 */
export function extractTags(
  category: string,
  description: string,
  weightCount?: number
): string[] {
  const tags: string[] = [];

  // Add category
  const mappedCategory = mapCategory(category);
  tags.push(mappedCategory);

  // Add weight info
  if (weightCount && weightCount > 1) {
    tags.push(`${weightCount}가지 굵기`);
  }

  // Extract keywords from description
  const keywords = [
    { pattern: /본문/i, tag: '본문' },
    { pattern: /제목/i, tag: '제목용' },
    { pattern: /둥근|둥글/i, tag: '둥근' },
    { pattern: /귀여운|귀엽/i, tag: '귀여운' },
    { pattern: /전통|고전/i, tag: '전통' },
    { pattern: /현대|모던/i, tag: '모던' },
    { pattern: /레트로|복고/i, tag: '레트로' },
    { pattern: /깔끔|심플/i, tag: '미니멀' },
    { pattern: /임팩트|강렬/i, tag: '임팩트' },
    { pattern: /고딕/i, tag: '기본 고딕' },
  ];

  for (const { pattern, tag } of keywords) {
    if (pattern.test(description) || pattern.test(category)) {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    }
  }

  return tags.slice(0, 5); // Max 5 tags
}
