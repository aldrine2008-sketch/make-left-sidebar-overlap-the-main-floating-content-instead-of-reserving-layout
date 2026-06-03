export function startViewTransition(callback: () => void): void {
  if (
    "startViewTransition" in document &&
    typeof (document as any).startViewTransition === "function"
  ) {
    (document as any).startViewTransition(callback);
  } else {
    callback();
  }
}

export function setViewTransitionName(
  element: HTMLElement | null,
  name: string,
): void {
  if (element) {
    element.style.viewTransitionName = name;
  }
}

export function clearViewTransitionName(element: HTMLElement | null): void {
  if (element) {
    element.style.viewTransitionName = "";
  }
}
