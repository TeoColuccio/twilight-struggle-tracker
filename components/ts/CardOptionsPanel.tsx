import { View, Switch } from 'react-native';
import { Text, Icon } from '~/components/ui';
import { useAppStore } from '~/store';
import { useColorScheme } from '~/lib/useColorScheme';
import { useTranslation } from 'react-i18next';

export const CardOptionsPanel = () => {
  const toggleBattleground = useAppStore((state) => state.toggleBattleground);
  const isTaiwanBattleground = useAppStore((state) => state.data.countriesByName['Taiwan']?.isTempBattleground ?? false);
  const showSEAsiaScore = useAppStore((state) => state.showSEAsiaScore);
  const toggleSEAsiaScore = useAppStore((state) => state.toggleSEAsiaScore);
  const { colors } = useColorScheme();
  const { t } = useTranslation();

  return (
    <View className="mb-3 rounded-xl border border-border bg-card px-4 py-3 gap-3">
      <Text variant="label" className="text-muted-foreground">{t('ui.specialActions')}</Text>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Icon type="MaterialCommunityIcons" name="sword-cross" size="body" color={colors.foreground} />
          <Text variant="body">{t('ui.formosaResolution')}</Text>
        </View>
        <Switch
          value={isTaiwanBattleground}
          onValueChange={() => toggleBattleground('Taiwan')}
          trackColor={{ false: colors.grey4, true: colors.primary }}
          thumbColor="white"
        />
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Icon type="MaterialCommunityIcons" name="map-marker-radius" size="body" color={colors.foreground} />
          <Text variant="body">{t('ui.seAsiaScore')}</Text>
        </View>
        <Switch
          value={showSEAsiaScore}
          onValueChange={toggleSEAsiaScore}
          trackColor={{ false: colors.grey4, true: colors.primary }}
          thumbColor="white"
        />
      </View>
    </View>
  );
};
