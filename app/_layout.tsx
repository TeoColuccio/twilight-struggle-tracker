import '../global.css';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  useInitialAndroidBarSync();

  const { colorScheme, isDarkColorScheme } = useColorScheme();

  useEffect(() => {
    async function init() {
      await SplashScreen.hideAsync();
    }

    init();
  }, []);

  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />

      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <NavThemeProvider value={NAV_THEME[colorScheme]}>
            <Stack screenOptions={SCREEN_OPTIONS}>
              <Stack.Screen name="(tabs)" />
            </Stack>
          </NavThemeProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}
const SCREEN_OPTIONS = {
  animation: 'ios_from_right', // for android
  headerShown: false,
} as const;
