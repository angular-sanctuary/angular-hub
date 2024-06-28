export function isPublicAsset(assetLink: string): boolean {
  return assetLink.startsWith('https://') || assetLink.startsWith('https://');
}
