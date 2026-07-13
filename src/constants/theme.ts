/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0f172a',             // slate-900
    background: '#f8fafc',       // slate-50
    backgroundElement: '#ffffff', // card background
    backgroundSelected: '#cbd5e1', // slate-300
    textSecondary: '#475569',     // slate-600
    border: '#e2e8f0',            // slate-200
    accent: '#6366f1',            // indigo-500
  },
  intermediate: {
    text: '#f8fafc',              // slate-50
    background: '#0f172a',        // slate-900
    backgroundElement: '#1e293b',  // slate-800
    backgroundSelected: '#334155', // slate-700
    textSecondary: '#94a3b8',     // slate-400
    border: 'rgba(255, 255, 255, 0.08)',
    accent: '#6366f1',
  },
  dark: {
    text: '#ffffff',
    background: '#020617',        // slate-955/dark
    backgroundElement: 'rgba(15, 23, 42, 0.4)',
    backgroundSelected: '#1e293b',
    textSecondary: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.05)',
    accent: '#7c3aed',            // violet-500
  },
} as const;

export type ThemeType = keyof typeof Colors;
export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark & keyof typeof Colors.intermediate;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
