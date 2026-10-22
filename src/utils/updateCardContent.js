export function updateCardContent({ cards, previousFaces, visibleIndex, hiddenFace }) {
  if (!cards.length) return previousFaces;

  const nextIndex = (visibleIndex + 1) % cards.length;
  const nextFaces = [...previousFaces];
  nextFaces[hiddenFace] = cards[nextIndex];
  return nextFaces;
}
