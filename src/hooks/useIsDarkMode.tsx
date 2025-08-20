import { useEffect, useState } from "react";

export function useIsDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const controller = new AbortController();
    mediaQuery.addEventListener(
      "change",
      (e) => {
        setIsDarkMode(e.matches);
      },
      { signal: controller.signal }
    );

    return () => {
      controller.abort();
    };
  }, []);

  return isDarkMode;
}
