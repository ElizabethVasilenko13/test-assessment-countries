export const getRandomElements = <T>(array: T[], count: number): T[] => {
  return array.sort(() => 0.5 - Math.random()).slice(0, count);
};
