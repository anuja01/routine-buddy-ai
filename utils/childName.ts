const CHILD_NAME = process.env.EXPO_PUBLIC_CHILD_NAME ?? 'superstar';

export const childName = CHILD_NAME;

export function withName(text: string): string {
  return text.replace(/\{name\}/g, CHILD_NAME);
}
