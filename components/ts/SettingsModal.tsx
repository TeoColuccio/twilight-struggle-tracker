import { View, Switch, Pressable, Modal, Animated, Platform, useWindowDimensions } from 'react-native';
import { Text, Icon } from '~/components/ui';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '~/store';
import type { StabilityDisplay } from '~/store';
import { useColorScheme } from '~/lib/useColorScheme';
import { useState, useEffect, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const LANGUAGE_ITEMS = [
  { label: 'Italiano', value: 'it' },
  { label: 'English', value: 'en' },
];

const STABILITY_ITEMS: { label: string; value: StabilityDisplay; icon: string }[] = [
  { label: 'ui.stabilityDots', value: 'dots', icon: 'dots-horizontal' },
  { label: 'ui.stabilityNumber', value: 'number', icon: 'numeric' },
];

export const SettingsModal = ({ visible, onClose }: Props) => {
  const { t, i18n } = useTranslation();
  const setLanguage = useAppStore((state) => state.setLanguage);
  const stabilityDisplay = useAppStore((state) => state.stabilityDisplay);
  const setStabilityDisplay = useAppStore((state) => state.setStabilityDisplay);
  const { isDarkColorScheme, toggleColorScheme, colors } = useColorScheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
        speed: 20,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 220,
        useNativeDriver: true,
      }).start();
      setDropdownOpen(false);
    }
  }, [visible]);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setDropdownOpen(false);
  };

  const currentLabel = LANGUAGE_ITEMS.find((item) => item.value === i18n.language)?.label
    ?? LANGUAGE_ITEMS[0].label;

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      {/* Backdrop */}
      <Pressable
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}
        onPress={onClose}
      />

      {/* Panel slides in from top */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            transform: [{ translateY: slideAnim }],
            paddingTop: insets.top,
            backgroundColor: colors.card,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            borderBottomWidth: 1,
            borderColor: colors.grey4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 10,
          },
        ]}>
        {/* Content */}
        <View style={{ paddingHorizontal: 24, paddingBottom: 8 }}>
          <View style={{ alignItems: 'center', paddingBottom: 16 }}>
            <Text variant="heading">{t('ui.settings')}</Text>
          </View>

          {/* Theme toggle */}
          {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderColor: colors.grey4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Icon
                type="MaterialCommunityIcons"
                name={isDarkColorScheme ? 'weather-night' : 'weather-sunny'}
                size="heading"
              />
              <Text variant="body">{isDarkColorScheme ? t('ui.darkTheme') : t('ui.lightTheme')}</Text>
            </View>
            <Switch
              value={isDarkColorScheme}
              onValueChange={toggleColorScheme}
              trackColor={{ false: colors.grey4, true: colors.primary }}
              thumbColor="white"
            />
          </View> */}

          {/* Language picker */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderColor: colors.grey4, zIndex: 10 }}>
            <Text variant="body">{t('ui.language')}</Text>

            <View>
              <Pressable
                onPress={() => setDropdownOpen((v) => !v)}
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 8,
                  borderRadius: 8, borderWidth: 1, borderColor: colors.grey4,
                  backgroundColor: colors.card, paddingHorizontal: 12, paddingVertical: 8,
                }}>
                <Text variant="body">{currentLabel}</Text>
                <Icon
                  type="MaterialCommunityIcons"
                  name={dropdownOpen ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={colors.foreground}
                />
              </Pressable>

              {dropdownOpen && (
                <View style={{
                  position: 'absolute', right: 0, top: 44,
                  minWidth: 120, zIndex: 50,
                  borderRadius: 8, borderWidth: 1, borderColor: colors.grey4,
                  backgroundColor: colors.card, overflow: 'hidden',
                }}>
                  {LANGUAGE_ITEMS.map((item, index) => (
                    <Pressable
                      key={item.value}
                      onPress={() => handleLanguageChange(item.value)}
                      style={{
                        paddingHorizontal: 16, paddingVertical: 12,
                        backgroundColor: item.value === i18n.language ? colors.primary + '26' : 'transparent',
                        borderBottomWidth: index < LANGUAGE_ITEMS.length - 1 ? 1 : 0,
                        borderColor: colors.grey4,
                      }}>
                      <Text variant="body" weight={item.value === i18n.language ? 'bold' : undefined}>
                        {item.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Stability display picker */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}>
            <Text variant="body">{t('ui.stabilityDisplay')}</Text>
            <View style={{ flexDirection: 'row', borderRadius: 8, borderWidth: 1, borderColor: colors.grey4, overflow: 'hidden' }}>
              {STABILITY_ITEMS.map((item, index) => {
                const isSelected = stabilityDisplay === item.value;
                return (
                  <Pressable
                    key={item.value}
                    onPress={() => setStabilityDisplay(item.value)}
                    style={{
                      flexDirection: 'row', alignItems: 'center', gap: 6,
                      paddingHorizontal: 14, paddingVertical: 8,
                      backgroundColor: isSelected ? colors.primary : 'transparent',
                      borderRightWidth: index < STABILITY_ITEMS.length - 1 ? 1 : 0,
                      borderColor: colors.grey4,
                    }}>
                    <Icon
                      type="MaterialCommunityIcons"
                      name={item.icon as any}
                      size={18}
                      color={isSelected ? '#ffffff' : colors.foreground}
                    />
                    <Text
                      variant="body"
                      weight={isSelected ? 'bold' : undefined}
                      className={isSelected ? 'text-white' : undefined}>
                      {t(item.label)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        {/* Handle at bottom */}
        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
          <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: colors.grey4 }} />
        </View>
      </Animated.View>
    </Modal>
  );
};
