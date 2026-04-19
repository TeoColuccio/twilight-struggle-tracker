import { Platform } from 'react-native';

const IOS_SYSTEM_COLORS = {
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  light: {
    grey6: 'rgb(242, 242, 247)',
    grey5: 'rgb(230, 230, 235)',
    grey4: 'rgb(210, 210, 215)',
    grey3: 'rgb(199, 199, 204)',
    grey2: 'rgb(175, 176, 180)', // muted
    grey: 'rgb(142, 142, 147)',
    background: 'rgb(242, 242, 247)',
    foreground: 'rgb(0, 0, 0)',
    root: 'rgb(255, 255, 255)',
    card: 'rgb(255, 255, 255)',
    destructive: 'rgb(188, 47, 47)',
    success: 'rgb(74, 222, 128)',
    primary: 'rgb(44, 176, 244)',
    secondary: 'rgb(244, 112, 44)',
  },
  dark: {
    grey6: 'rgb(8, 12, 22)',
    grey5: 'rgb(22, 30, 56)',
    grey4: 'rgb(32, 44, 74)',
    grey3: 'rgb(50, 65, 105)',
    grey2: 'rgb(100, 115, 155)', // muted
    grey: 'rgb(155, 170, 210)',
    background: 'rgb(8, 12, 22)',
    foreground: 'rgb(220, 226, 255)',
    root: 'rgb(8, 12, 22)',
    card: 'rgb(15, 21, 40)',
    destructive: 'rgb(239, 68, 68)',
    success: 'rgb(74, 222, 128)',
    primary: 'rgb(96, 165, 250)',
    secondary: 'rgb(244, 112, 44)',
  },
} as const;

const ANDROID_COLORS = {
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  light: {
    grey6: 'rgb(249, 249, 255)',
    grey5: 'rgb(215, 217, 228)',
    grey4: 'rgb(193, 198, 215)',
    grey3: 'rgb(113, 119, 134)',
    grey2: 'rgb(65, 71, 84)', // muted
    grey: 'rgb(24, 28, 35)',
    background: 'rgb(249, 249, 255)',
    foreground: 'rgb(0, 0, 0)',
    root: 'rgb(255, 255, 255)',
    card: 'rgb(255, 255, 255)',
    destructive: 'rgb(239, 68, 68)',
    success: 'rgb(74, 222, 128)',
    primary: 'rgb(96, 165, 250)',
    secondary: 'rgb(244, 112, 44)',
  },
  dark: {
    grey6: 'rgb(8, 12, 22)',
    grey5: 'rgb(22, 30, 56)',
    grey4: 'rgb(32, 44, 74)',
    grey3: 'rgb(50, 65, 105)',
    grey2: 'rgb(100, 115, 155)', // muted
    grey: 'rgb(155, 170, 210)',
    background: 'rgb(8, 12, 22)',
    foreground: 'rgb(220, 226, 255)',
    root: 'rgb(8, 12, 22)',
    card: 'rgb(15, 21, 40)',
    destructive: 'rgb(239, 68, 68)',
    success: 'rgb(74, 222, 128)',
    primary: 'rgb(96, 165, 250)',
    secondary: 'rgb(244, 112, 44)',
  },
} as const;

const COLORS = Platform.OS === 'ios' ? IOS_SYSTEM_COLORS : ANDROID_COLORS;

export { COLORS };
