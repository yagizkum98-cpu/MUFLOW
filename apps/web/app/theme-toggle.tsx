"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = window.localStorage.getItem("muflow-theme") as Theme | null;
    const initial = saved === "dark" ? "dark" : "light";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  function changeTheme(nextTheme: Theme) {
    setTheme(nextTheme);
    window.localStorage.setItem("muflow-theme", nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <div className="theme-toggle" aria-label="Tema seçimi">
      <button className={theme === "light" ? "active" : ""} type="button" onClick={() => changeTheme("light")}>
        Gündüz
      </button>
      <button className={theme === "dark" ? "active" : ""} type="button" onClick={() => changeTheme("dark")}>
        Gece
      </button>
    </div>
  );
}
