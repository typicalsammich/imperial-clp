"use client";

import { useEffect } from "react";

export default function SiteCursor() {
  useEffect(() => {
    const move = (e) => {
      document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
    };
    const over = (e) => {
      const interactive = e.target.closest("a,button,input,select,.compare-range");
      document.body.classList.toggle("cursor-hover", !!interactive);
    };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.body.classList.remove("cursor-hover");
    };
  }, []);
  return null;
}