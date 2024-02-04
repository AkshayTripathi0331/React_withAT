import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const ThemingExample = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemedComponent />
      <ThemeToggle />
    </ThemeContext.Provider>
  );
};

const ThemedComponent = () => {
  const theme = useContext(ThemeContext);

  return <div style={{ color: theme === 'dark' ? 'white' : 'black' }}>Themed Content</div>;
};

const ThemeToggle = () => {
  const { setTheme } = useContext(ThemeContext);

  return (
    <button onClick={() => setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))}>
      Toggle Theme
    </button>
  );
};

export default ThemingExample;
