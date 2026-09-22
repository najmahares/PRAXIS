"use client";

import { useEffect, useRef, type RefObject } from "react";














export function useModalA11y(
  open: boolean,
  onClose: () => void,
  fallbackLabel?: string
): RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const container = ref.current;
    if (!container) return;

    const previousActive = document.activeElement as HTMLElement | null;

    
    if (!container.getAttribute("aria-labelledby")) {
      const heading = container.querySelector("h1, h2, h3, h4, h5, h6");
      if (heading) {
        if (!heading.id) {
          heading.id =
            "modal-title-" + Math.random().toString(36).slice(2, 9);
        }
        container.setAttribute("aria-labelledby", heading.id);
      } else if (fallbackLabel) {
        container.setAttribute("aria-label", fallbackLabel);
      }
    }

    
    const FOCUSABLE =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    function getFocusable(): HTMLElement[] {
      if (!container) return [];
      return Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
    }

    const focusable = getFocusable();
    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      container.setAttribute("tabindex", "-1");
      container.focus();
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const list = getFocusable();
      if (list.length === 0) return;

      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || !container!.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last || !container!.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (previousActive && typeof previousActive.focus === "function") {
        previousActive.focus();
      }
    };
  }, [open, onClose, fallbackLabel]);

  return ref;
}
