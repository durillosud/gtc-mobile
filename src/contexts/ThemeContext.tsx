import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import * as Linking from 'expo-linking';

export type ThemeType = 'light' | 'intermediate' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useRNColorScheme();
  const [theme, setThemeState] = useState<ThemeType>('dark');

  useEffect(() => {
    // 1. Carrega o tema a partir do deep link de autenticação ou query param (ex: gtc://auth/callback?theme=...)
    const checkUrlForTheme = (url: string | null) => {
      if (!url) return;
      try {
        const parsed = Linking.parse(url);
        const paramTheme = parsed.queryParams?.theme as ThemeType;
        if (paramTheme && (paramTheme === 'light' || paramTheme === 'intermediate' || paramTheme === 'dark')) {
          setThemeState(paramTheme);
        }
      } catch (e) {
        // Ignora erros de parse de URL
      }
    };

    Linking.getInitialURL().then(checkUrlForTheme);
    const subscription = Linking.addEventListener('url', (event) => checkUrlForTheme(event.url));

    // 2. Fallback para preferência de sistema se não houver tema configurado
    if (systemScheme === 'light') {
      setThemeState((prev) => (prev === 'dark' ? 'light' : prev));
    }

    return () => subscription.remove();
  }, [systemScheme]);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
}
