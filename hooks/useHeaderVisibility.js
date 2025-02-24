"use client";
import { useState, useEffect, useRef } from "react";

// This hook listens to scroll events (using a simple throttle)
// and returns whether the header should be visible.
export function useHeaderVisibility(throttleWait = 200) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // If scrolling down, hide the header; if scrolling up, show it.
      setIsVisible(currentScrollY <= lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };

    const throttledHandleScroll = throttle(handleScroll, throttleWait);
    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [throttleWait]);

  return isVisible;
}

// A simple throttle function.
function throttle(fn, wait) {
  let lastTime = Date.now();
  return function () {
    if (Date.now() - lastTime >= wait) {
      fn();
      lastTime = Date.now();
    }
  };
}
