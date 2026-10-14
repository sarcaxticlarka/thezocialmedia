// document.fonts.ready can resolve before the lazily-loaded web fonts are even requested, which makes SplitType
// measure lines with the fallback font. Request the faces we split text in, then wait.
export function fontsReady() {
  if (typeof document === 'undefined' || !document.fonts) return Promise.resolve();
  const wanted = ['500 20px "Inter Tight Variable"', '700 20px "Inter Tight Variable"', '400 20px Anton', '400 20px Impact'];
  return Promise.all(wanted.map((f) => document.fonts.load(f).catch(() => null))).then(() => document.fonts.ready).catch(() => {});
}
