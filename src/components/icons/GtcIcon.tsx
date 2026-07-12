import React from 'react';
import Svg, { Path, Polyline, Line, Circle, Rect, G } from 'react-native-svg';

export type GtcIconName =
  | 'dashboard'
  | 'book'
  | 'circulation'
  | 'users'
  | 'reports'
  | 'logout'
  | 'bell'
  | 'menu'
  | 'close'
  | 'search'
  | 'plus'
  | 'return'
  | 'warning'
  | 'download'
  | 'receipt'
  | 'home'
  | 'scanner'
  | 'chevron-right'
  | 'loan'
  | 'book-open';

interface GtcIconProps {
  name: GtcIconName;
  size?: number;
  color?: string;
}

const defaultStrokeProps = {
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  fill: 'none',
};

function IconContent({ name, color }: { name: GtcIconName; color: string }) {
  const s = { ...defaultStrokeProps, stroke: color };

  switch (name) {
    case 'dashboard':
      return (
        <G {...s}>
          <Rect x="3" y="3" width="7" height="7" rx={1} />
          <Rect x="14" y="3" width="7" height="7" rx={1} />
          <Rect x="3" y="14" width="7" height="7" rx={1} />
          <Rect x="14" y="14" width="7" height="7" rx={1} />
        </G>
      );
    case 'book':
      return (
        <G {...s}>
          <Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <Path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <Line x1="8" y1="7" x2="16" y2="7" />
          <Line x1="8" y1="11" x2="13" y2="11" />
        </G>
      );
    case 'circulation':
      return (
        <G {...s}>
          <Polyline points="17 1 21 5 17 9" />
          <Path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <Polyline points="7 23 3 19 7 15" />
          <Path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </G>
      );
    case 'users':
      return (
        <G {...s}>
          <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <Circle cx="9" cy="7" r="4" />
          <Path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </G>
      );
    case 'reports':
      return (
        <G {...s}>
          <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <Polyline points="14 2 14 8 20 8" />
          <Line x1="8" y1="13" x2="16" y2="13" />
          <Line x1="8" y1="17" x2="12" y2="17" />
        </G>
      );
    case 'logout':
      return (
        <G {...s}>
          <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <Polyline points="16 17 21 12 16 7" />
          <Line x1="21" y1="12" x2="9" y2="12" />
        </G>
      );
    case 'bell':
      return (
        <G {...s}>
          <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </G>
      );
    case 'menu':
      return (
        <G {...s}>
          <Line x1="3" y1="6" x2="21" y2="6" />
          <Line x1="3" y1="12" x2="21" y2="12" />
          <Line x1="3" y1="18" x2="21" y2="18" />
        </G>
      );
    case 'close':
      return (
        <G {...s}>
          <Line x1="18" y1="6" x2="6" y2="18" />
          <Line x1="6" y1="6" x2="18" y2="18" />
        </G>
      );
    case 'search':
      return (
        <G {...s}>
          <Circle cx="11" cy="11" r="8" />
          <Line x1="21" y1="21" x2="16.65" y2="16.65" />
        </G>
      );
    case 'plus':
      return (
        <G {...s}>
          <Line x1="12" y1="5" x2="12" y2="19" />
          <Line x1="5" y1="12" x2="19" y2="12" />
        </G>
      );
    case 'return':
      return (
        <G {...s}>
          <Polyline points="9 14 4 9 9 4" />
          <Path d="M20 20v-7a4 4 0 0 0-4-4H4" />
        </G>
      );
    case 'warning':
      return (
        <G {...s}>
          <Path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <Line x1="12" y1="9" x2="12" y2="13" />
          <Line x1="12" y1="17" x2="12.01" y2="17" />
        </G>
      );
    case 'download':
      return (
        <G {...s}>
          <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <Polyline points="7 10 12 15 17 10" />
          <Line x1="12" y1="15" x2="12" y2="3" />
        </G>
      );
    case 'receipt':
      return (
        <G {...s}>
          <Path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2-3 2-3-2z" />
          <Line x1="8" y1="8" x2="16" y2="8" />
          <Line x1="8" y1="12" x2="16" y2="12" />
          <Line x1="8" y1="16" x2="12" y2="16" />
        </G>
      );
    case 'home':
      return (
        <G {...s}>
          <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <Polyline points="9 22 9 12 15 12 15 22" />
        </G>
      );
    case 'scanner':
      return (
        <G {...s}>
          <Path d="M3 7V5a2 2 0 0 1 2-2h2" />
          <Path d="M17 3h2a2 2 0 0 1 2 2v2" />
          <Path d="M21 17v2a2 2 0 0 1-2 2h-2" />
          <Path d="M7 21H5a2 2 0 0 1-2-2v-2" />
          <Line x1="3" y1="12" x2="21" y2="12" />
        </G>
      );
    case 'chevron-right':
      return (
        <Polyline points="9 18 15 12 9 6" {...s} />
      );
    case 'loan':
      return (
        <G {...s}>
          <Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H16" />
          <Path d="M6.5 2H16v13H6.5A2.5 2.5 0 0 1 4 12.5v-8A2.5 2.5 0 0 1 6.5 2z" />
          <Polyline points="19 7 22 10 19 13" />
          <Line x1="16" y1="10" x2="22" y2="10" />
        </G>
      );
    case 'book-open':
      return (
        <G {...s}>
          <Path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <Path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </G>
      );
    default:
      return null;
  }
}

export function GtcIcon({ name, size = 20, color = '#333' }: GtcIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <IconContent name={name} color={color} />
    </Svg>
  );
}
