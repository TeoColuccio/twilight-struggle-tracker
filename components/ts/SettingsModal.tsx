import { View, Switch } from 'react-native';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetModal } from '~/components/partials';
import { Text, Icon } from '~/components/ui';
import { useColorScheme } from '~/lib/useColorScheme';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ visible, onClose }: Props) => {
  const { isDarkColorScheme, toggleColorScheme, colors } = useColorScheme();

  return (
    <SheetModal visible={visible} onClose={onClose} snapPoints={['30%']} index={0}>
      <BottomSheetView className="flex-1 px-6 pb-8 pt-4">
        <View className="items-center pb-6">
          <Text variant="heading">Settings</Text>
        </View>

        {/* Switch tema — disabilitato temporaneamente: web=light fisso, mobile=dark fisso
        <View className="flex-row items-center justify-between py-3 border-b border-b-foreground/10">
          <View className="flex-row items-center gap-3">
            <Icon
              type="MaterialCommunityIcons"
              name={isDarkColorScheme ? 'weather-night' : 'weather-sunny'}
              size="heading"
            />
            <Text variant="body">{isDarkColorScheme ? 'Dark theme' : 'Light theme'}</Text>
          </View>
          <Switch
            value={isDarkColorScheme}
            onValueChange={toggleColorScheme}
            trackColor={{ false: colors.grey4, true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>
        */}
      </BottomSheetView>
    </SheetModal>
  );
};
