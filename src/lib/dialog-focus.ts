type FocusTarget = { focus: () => void };

export function trapDialogTabFocus(
  event: { key: string; shiftKey: boolean; preventDefault: () => void },
  focusable: FocusTarget[],
  activeElement: FocusTarget | null,
  focusDialog: () => void,
) {
  if (event.key !== "Tab") return false;
  if (focusable.length === 0) {
    event.preventDefault();
    focusDialog();
    return true;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && activeElement === first) {
    event.preventDefault();
    last.focus();
    return true;
  }
  if (!event.shiftKey && activeElement === last) {
    event.preventDefault();
    first.focus();
    return true;
  }
  return false;
}
