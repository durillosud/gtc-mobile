import * as Device from 'expo-device';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/contexts/ThemeContext';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const { theme, setTheme } = useAppTheme();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Gnuteca Staff
          </ThemedText>
          <ThemedText type="small" style={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: '700' }}>
            Painel do Bibliotecário
          </ThemedText>
        </ThemedView>

        <ThemedText type="defaultSemiBold" style={styles.label}>
          Configuração de Tema
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.themeSelectorContainer}>
          <TouchableOpacity
            style={[styles.themeOptionButton, theme === 'light' && styles.themeOptionActive]}
            onPress={() => setTheme('light')}
          >
            <ThemedText style={[styles.themeOptionText, theme === 'light' && styles.themeOptionTextActive]}>
              Claro
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.themeOptionButton, theme === 'intermediate' && styles.themeOptionActive]}
            onPress={() => setTheme('intermediate')}
          >
            <ThemedText style={[styles.themeOptionText, theme === 'intermediate' && styles.themeOptionTextActive]}>
              Suave
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.themeOptionButton, theme === 'dark' && styles.themeOptionActive]}
            onPress={() => setTheme('dark')}
          >
            <ThemedText style={[styles.themeOptionText, theme === 'dark' && styles.themeOptionTextActive]}>
              Escuro
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 10,
    fontWeight: '800',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
    paddingLeft: Spacing.one,
  },
  themeSelectorContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderRadius: Spacing.three,
    padding: 4,
    gap: 4,
    marginBottom: Spacing.five,
  },
  themeOptionButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: Spacing.two,
  },
  themeOptionActive: {
    backgroundColor: '#7c3aed',
  },
  themeOptionText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
  },
  themeOptionTextActive: {
    color: '#ffffff',
  },
});
