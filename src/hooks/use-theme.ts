import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/contexts/ThemeContext';

export function useTheme() {
  const { theme } = useAppTheme();
  return Colors[theme];
}
