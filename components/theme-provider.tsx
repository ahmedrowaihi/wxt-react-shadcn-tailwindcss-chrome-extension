// ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { browser } from "wxt/browser";

const ThemeContext = createContext<{ theme: string; toggleTheme: Function }>({
  theme: "dark",
  toggleTheme: (theme: string) => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: any }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = (theme: string) => {
    setTheme(theme);
  };

  async function initTheme() {
    let data = await browser.storage.local.get("theme");
    if (data.theme) {
      setTheme(data.theme);
    } else {
      // Set default theme to dark if no theme is stored
      await browser.storage.local.set({ theme: "dark" });
    }
  }

  useEffect(() => {
    initTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
