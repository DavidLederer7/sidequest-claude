// Shared pointer behavior for the web and embedded Escape boards.
export const EXIT_TRAVEL = 0.4;
// Presentation only: the rules and replays still end at logical column 4.
export function exitTravel(isBlue, max) {
  return isBlue && max === 4 ? EXIT_TRAVEL : 0;
}
export function dragTarget(from, pixels, unit, min, max) {
  const cells = pixels / unit;
  const steps = Math.sign(cells) * Math.floor(Math.abs(cells) + 0.5);
  return Math.max(min, Math.min(max, from + steps));
}

const animations = new WeakMap();
const translate = (axis, pixels) =>
  axis === 'h'
    ? `translate3d(${pixels}px,0,0)`
    : `translate3d(0,${pixels}px,0)`;

export function settleBlock(element, axis, offset) {
  animations.get(element)?.cancel();
  if (
    Math.abs(offset) < 0.1 ||
    matchMedia('(prefers-reduced-motion: reduce)').matches
  )
    return;
  const animation = element.animate(
    [{ transform: translate(axis, offset) }, { transform: translate(axis, 0) }],
    { duration: 130, easing: 'cubic-bezier(.2,.8,.2,1)' },
  );
  animations.set(element, animation);
  animation.onfinish = () => {
    if (animations.get(element) === animation) animations.delete(element);
  };
}

/** Track the pointer directly, then let the host commit one legal slide.
 * @param {{element:HTMLButtonElement,board:HTMLElement,event:PointerEvent,axis:'h'|'v',from:number,min:number,max:number,exit?:number,eventTarget?:EventTarget,onDrop:(to:number,offset:number)=>void,onEnd:()=>void}} options
 */
export function beginBlockDrag({
  element,
  board,
  event,
  axis,
  from,
  min,
  max,
  exit = 0,
  onDrop,
  onEnd,
  eventTarget = element.ownerDocument?.defaultView || element,
}) {
  const unit = board.clientWidth / 6;
  const coordinate = (e) => (axis === 'h' ? e.clientX : e.clientY);
  const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
  let pixels = axis === 'h' ? matrix.m41 : matrix.m42;
  const origin = coordinate(event) - pixels;
  animations.get(element)?.cancel();
  let frame = 0,
    ended = false;
  const paint = () => {
    frame = 0;
    element.style.transform = translate(axis, pixels);
  };
  const update = (e) => {
    pixels = Math.max(
      (min - from) * unit,
      Math.min((max + exit - from) * unit, coordinate(e) - origin),
    );
  };
  const move = (e) => {
    if (e.pointerId !== event.pointerId) return;
    update(e);
    if (!frame) frame = requestAnimationFrame(paint);
  };
  const cleanup = () => {
    ended = true;
    cancelAnimationFrame(frame);
    eventTarget.removeEventListener('pointermove', move, true);
    eventTarget.removeEventListener('pointerup', finish, true);
    eventTarget.removeEventListener('pointercancel', cancel, true);
    eventTarget.removeEventListener('pointerout', leaveSurface, true);
    element.removeEventListener('lostpointercapture', lostCapture);
    if (element.hasPointerCapture(event.pointerId))
      element.releasePointerCapture(event.pointerId);
    element.classList.remove('is-dragging');
    element.style.transform = '';
  };
  const finish = (e) => {
    if (ended || e.pointerId !== event.pointerId) return;
    // pointerup can carry a newer position than the last pointermove/frame.
    update(e);
    commit();
  };
  const commit = () => {
    const to = dragTarget(from, pixels, unit, min, max);
    const offset = pixels - (to - from + (to === max ? exit : 0)) * unit;
    cleanup();
    onEnd();
    if (to === from) settleBlock(element, axis, offset);
    else onDrop(to, offset);
  };
  const cancel = (e) => {
    if (ended || e.pointerId !== event.pointerId) return;
    cleanup();
    onEnd();
    settleBlock(element, axis, pixels);
  };
  // Hosts can release capture when the pointer leaves an embedded surface.
  // Keep the last legal position; lostcapture coordinates are not reliable.
  // Actual pointercancel still cancels, and cleanup removes this handler first.
  const lostCapture = (e) => {
    if (!ended && e.pointerId === event.pointerId) commit();
  };
  // Some embedded hosts never deliver pointerup/lostcapture after the cursor
  // crosses the iframe boundary. Finish at that last observed legal position.
  // Ignore ordinary transitions between tiles/descendants and touch gestures.
  const leaveSurface = (e) => {
    if (
      ended ||
      e.pointerId !== event.pointerId ||
      e.relatedTarget !== null ||
      e.pointerType !== 'mouse'
    )
      return;
    update(e);
    commit();
  };
  element.focus({ preventScroll: true });
  element.setPointerCapture(event.pointerId);
  element.classList.add('is-dragging');
  paint();
  eventTarget.addEventListener('pointermove', move, true);
  eventTarget.addEventListener('pointerup', finish, true);
  eventTarget.addEventListener('pointercancel', cancel, true);
  eventTarget.addEventListener('pointerout', leaveSurface, true);
  element.addEventListener('lostpointercapture', lostCapture);
  return cleanup;
}
