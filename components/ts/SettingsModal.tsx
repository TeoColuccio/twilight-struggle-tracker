import { View, Switch } from 'react-native';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetModal } from '~/components/partials';
import { Text, Icon } from '~/components/ui';
import { ToggleGroup } from '~/components/ui/ToggleGroup';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '~/store';
import { useColorScheme } from '~/lib/useColorScheme';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const LANGUAGE_ITEMS = [
  { label: 'Italiano', value: 'it' },
  { label: 'English', value: 'en' },
];

export const SettingsModal = ({ visible, onClose }: Props) => {
  const { t, i18n } = useTranslation();
  const setLanguage = useAppStore((state) => state.setLanguage);
  const { isDarkColorScheme, toggleColorScheme, colors } = useColorScheme();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <SheetModal visible={visible} onClose={onClose} snapPoints={['30%']} index={0}>
      <BottomSheetView className="flex-1 px-6 pb-8 pt-4">
        <View className="items-center pb-6">
          <Text variant="heading">{t('ui.settings')}</Text>
        </View>

        <View className="flex-row items-center justify-between py-3 border-b border-b-foreground/10">
          <View className="flex-row items-center gap-3">
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
        </View>

        <View className="flex-row items-center justify-between py-3">
          <Text variant="body">{t('ui.language')}</Text>
          <ToggleGroup
            items={LANGUAGE_ITEMS}
            value={i18n.language}
            onChange={handleLanguageChange}
          />
        </View>
      </BottomSheetView>
    </SheetModal>
  );
};
