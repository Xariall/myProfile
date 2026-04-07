export function usePortfolioData() {
  return (window as any).__DATA__ ?? {};
}
