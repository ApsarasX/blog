import Micromatch from 'micromatch';

type Matcher = (str: string) => boolean;

export function createMatcher(patterns: string[]): Matcher {
  if (patterns.length === 0) {
    // `/(?:)/.test("foo")` is `true`
    return () => false;
  }
  const regexp = new RegExp(
    patterns.map(pattern => Micromatch.makeRe(pattern).source).join('|')
  );
  return str => regexp.test(str);
}
