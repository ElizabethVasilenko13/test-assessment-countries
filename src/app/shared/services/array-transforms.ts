export const getRandomElements = <T>(array: T[], count: number): T[] => {
  return [...array].sort(() => 0.5 - Math.random()).slice(0, count);
};

export const generateRange = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
