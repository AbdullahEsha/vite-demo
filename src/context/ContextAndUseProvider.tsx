// ContextAndUseProvider.tsx
import { ReactNode, createContext, useState } from "react";

type Theme = {
  color: string;
  fontSize: string;
};

// Creating ThemeContext
export const ThemeContext = createContext<Promise<Theme>>(
  Promise.resolve({ color: "dark", fontSize: "16px" })
);

// Create a promise that we can resolve externally
let currentTheme: Theme = { color: "dark", fontSize: "16px" };

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themePromise, setThemePromise] = useState(
    () =>
      new Promise<Theme>((resolve) => {
        setTimeout(() => resolve(currentTheme), 1000);
      })
  );

  // Expose updateTheme through a ref so it's stable across renders
  ThemeProvider.updateTheme = (newTheme?: Theme): Promise<void> => {
    return new Promise<void>((resolve) => {
      currentTheme = newTheme ?? currentTheme;
      setThemePromise(Promise.resolve(newTheme ?? currentTheme));
      console.log("Theme updated to:", newTheme);
      resolve();
    });
  };

  return (
    <ThemeContext.Provider value={themePromise}>
      {children}
    </ThemeContext.Provider>
  );
};

// Add updateTheme to the ThemeProvider type
ThemeProvider.updateTheme = (newTheme?: Theme): Promise<void> => {
  console.warn("Theme provider not mounted yet");

  // Return a promise that resolves when the ThemeProvider mounts
  return new Promise<void>((resolve) => {
    if (newTheme) {
      currentTheme = newTheme;
    }

    // Resolve the promise after 1 second
    setTimeout(() => {
      console.log("Theme provider mounted");
      resolve();
    }, 1000);
  });
};

// Export updateTheme function
export const updateTheme = (newTheme: Theme) => {
  ThemeProvider.updateTheme(newTheme);
};
