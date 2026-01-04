import { GUIDES } from '../config/guides';

export function validateGuideConfig() {
  const errors: string[] = [];

  Object.entries(GUIDES).forEach(([key, guide]) => {
    if (guide.id !== key) {
      errors.push(`Guide key "${key}" doesn't match id "${guide.id}"`);
    }

    if (!guide.route.startsWith('/') && guide.route !== '/') {
      errors.push(`Guide "${guide.id}" route must start with /`);
    }

    if (guide.navigation.length === 0) {
      errors.push(`Guide "${guide.id}" has no navigation items`);
    }

    const duplicateIds = guide.navigation
      .map(n => n.id)
      .filter((id, idx, arr) => arr.indexOf(id) !== idx);

    if (duplicateIds.length > 0) {
      errors.push(`Guide "${guide.id}" has duplicate nav IDs: ${duplicateIds.join(', ')}`);
    }
  });

  if (errors.length > 0) {
    throw new Error(`Guide configuration errors:\n${errors.join('\n')}`);
  }

  return true;
}
