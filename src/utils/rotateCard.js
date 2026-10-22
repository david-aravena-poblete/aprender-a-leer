export function rotateCard({ interval = 1000, duration = 600, onRotate, onUpdate, itemCount }) {
  if (itemCount < 2) return () => {};

  let rotation = 0;
  let visibleIndex = 0;
  let updateTimer;
  let rotationTimer;

  const tick = () => {
    rotation += 180;
    visibleIndex = (visibleIndex + 1) % itemCount;
    onRotate(rotation);

    // Once the transition finishes, prepare the now-hidden face.
    const hiddenFace = (rotation / 180) % 2 === 1 ? 0 : 1;
    updateTimer = setTimeout(() => {
      onUpdate(visibleIndex, hiddenFace);
    }, duration);
  };

  rotationTimer = setInterval(tick, interval);

  return () => {
    clearInterval(rotationTimer);
    clearTimeout(updateTimer);
  };
}
