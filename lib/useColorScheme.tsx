import * as NavigationBar from 'expo-navigation-bar';
import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import * as React from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS } from '~/theme/colors';

const COLOR_SCHEME_KEY = 'color-scheme';

function useColorScheme() {
  const { colorScheme, setColorScheme: setNativeWindColorScheme } = useNativewindColorScheme();

  React.useEffect(() => {
    async function loadSavedScheme() {
      try {
        const saved = await AsyncStorage.getItem(COLOR_SCHEME_KEY);
        if (saved === 'light' || saved === 'dark') {
          setNativeWindColorScheme(saved);
          applyDomClass(saved);
        } else if (Platform.OS === 'web') {
          // Web default: light theme
          setNativeWindColorScheme('light');
          applyDomClass('light');
        } else {
          // Mobile default: dark theme
          setNativeWindColorScheme('dark');
          applyDomClass('dark');
        }
      } catch {
        if (Platform.OS === 'web') {
          setNativeWindColorScheme('light');
          applyDomClass('light');
        } else {
          setNativeWindColorScheme('dark');
          applyDomClass('dark');
        }
      }
    }
    loadSavedScheme();
  }, [setNativeWindColorScheme]);

  async function setColorScheme(colorScheme: 'light' | 'dark') {
    setNativeWindColorScheme(colorScheme);
    applyDomClass(colorScheme);
    try {
      await AsyncStorage.setItem(COLOR_SCHEME_KEY, colorScheme);
    } catch {}
    if (Platform.OS !== 'android') return;
    try {
      await setNavigationBar(colorScheme);
    } catch (error) {
      console.error('useColorScheme.tsx", "setColorScheme', error);
    }
  }

  function toggleColorScheme() {
    return setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  }

  return {
    colorScheme: colorScheme ?? 'light',
    isDarkColorScheme: colorScheme === 'dark',
    setColorScheme,
    toggleColorScheme,
    colors: COLORS[colorScheme ?? 'light'],
  };
}

/**
 * Set the Android navigation bar color based on the color scheme.
 */
function useInitialAndroidBarSync() {
  const { colorScheme } = useColorScheme();
  React.useEffect(() => {
    if (Platform.OS !== 'android') return;
    setNavigationBar(colorScheme).catch((error) => {
      console.error('useColorScheme.tsx", "useInitialColorScheme', error);
    });
  }, [colorScheme]);
}

export { useColorScheme, useInitialAndroidBarSync };

function applyDomClass(scheme: 'light' | 'dark') {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  if (scheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

function setNavigationBar(colorScheme: 'light' | 'dark') {
  return Promise.all([
    NavigationBar.setButtonStyleAsync(colorScheme === 'dark' ? 'light' : 'dark'),
    // NavigationBar.setPositionAsync('absolute'),
    // NavigationBar.setBackgroundColorAsync(colorScheme === 'dark' ? '#00000030' : '#ffffff80'),
  ]);
}
