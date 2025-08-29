export function isOnTopic(text: string): boolean {
  if (!text) return true;
  const offTopicPatterns = [
    /pol[ií]tica|elections?|president/i,
    /medicina|diagn[oó]stico|salud/i,
    /deportes?|f[uú]tbol|nba|nfl/i,
    /relaci[oó]n|citas|sexo/i,
    /chismes?|celebridades?|fama/i
  ];
  return !offTopicPatterns.some((re) => re.test(text));
}
