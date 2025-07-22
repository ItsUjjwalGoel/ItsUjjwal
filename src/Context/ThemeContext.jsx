import React, { createContext, useContext, useState, useMemo } from 'react';
const colorThemes = [
  {
    name: 'green',
    rgb: 'rgb(1,255,168)',
    rgbaLight: 'rgba(1,255,168,0.08)',
    bg: 'bg-[rgb(1,255,168)]',
    lightbg: 'bg-[rgba(1,255,168,0.1)]',
    border: 'border-[rgba(1,255,168,0.5)]',
    hoverborder: 'hover:border-[rgb(1,255,168)]',
    hovershadow: 'hover:shadow-[0_25px_50px_-12px_rgba(1,255,168,0.25)]',
    glowShadow: 'shadow-[0_0_10px_rgba(1,255,168,1)]',
    textGradient: 'from-[rgb(1,255,168)] to-[rgb(1,200,140)]'
  },
  {
    name: 'red',
    rgb: 'rgb(255,1,49)',
    rgbaLight: 'rgba(255,1,49,0.08)',
    bg: 'bg-[rgb(255,1,49)]',
    lightbg: 'bg-[rgba(255,1,49,0.1)]',
    border: 'border-[rgba(255,1,49,0.5)]',
    hoverborder: 'hover:border-[rgb(255,1,49)]',
    hovershadow: 'hover:shadow-[0_25px_50px_-12px_rgba(255,1,49,0.25)]',
    glowShadow: 'shadow-[0_0_10px_rgba(255,1,49,1)]',
    textGradient: 'from-[rgb(255,1,49)] to-[rgb(200,1,39)]'
  },
  {
    name: 'yellow',
    rgb: 'rgb(255,192,1)',
    rgbaLight: 'rgba(255,192,1,0.08)',
    bg: 'bg-[rgb(255,192,1)]',
    lightbg: 'bg-[rgba(255,192,1,0.1)]',
    border: 'border-[rgba(255,192,1,0.5)]',
    hoverborder: 'hover:border-[rgb(255,192,1)]',
    hovershadow: 'hover:shadow-[0_25px_50px_-12px_rgba(255,192,1,0.25)]',
    glowShadow: 'shadow-[0_0_10px_rgba(255,192,1,1)]',
    textGradient: 'from-[rgb(255,192,1)] to-[rgb(200,150,1)]'
  },
  {
    name: 'blue',
    rgb: 'rgb(1,219,255)',
    rgbaLight: 'rgba(1,219,255,0.08)',
    bg: 'bg-[rgb(1,219,255)]',
    lightbg: 'bg-[rgba(1,219,255,0.1)]',
    border: 'border-[rgba(1,219,255,0.5)]',
    hoverborder: 'hover:border-[rgb(1,219,255)]',
    hovershadow: 'hover:shadow-[0_25px_50px_-12px_rgba(1,219,255,0.25)]',
    glowShadow: 'shadow-[0_0_10px_rgba(1,219,255,1)]',
    textGradient: 'from-[rgb(1,219,255)] to-[rgb(1,170,200)]'
  }
];

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const currentTheme = useMemo(() => colorThemes[currentThemeIndex], [currentThemeIndex]);

  const setThemeByIndex = (index) => {
    if (index >= 0 && index < colorThemes.length) {
      setCurrentThemeIndex(index);
    }
  };

  const setThemeByName = (name) => {
    const index = colorThemes.findIndex(theme => theme.name === name);
    if (index !== -1) {
      setCurrentThemeIndex(index);
    }
  };
  const nextTheme = () => {
    setCurrentThemeIndex((prev) => (prev + 1) % colorThemes.length);
  };

  const previousTheme = () => {
    setCurrentThemeIndex((prev) => (prev - 1 + colorThemes.length) % colorThemes.length);
  };
  const contextValue = useMemo(() => ({
    currentTheme,
    currentThemeIndex,
    colorThemes,
    setThemeByIndex,
    setThemeByName,
    nextTheme,
    previousTheme
  }), [currentTheme, currentThemeIndex]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const withTheme = (Component) => {
  return function ThemedComponent(props) {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
};