import { View, Switch } from 'react-native';
import { Text, Icon } from '~/components/ui';
import { useAppStore } from '~/store';
import { useColorScheme } from '~/lib/useColorScheme';
import { useTranslation } from 'react-i18next';

export const CardOptionsPanel = () => {
  const toggleBattleground = useAppStore((state) => state.toggleBattleground);
  const isTaiwanBattleground = useAppStore(
    (state) => state.data.countriesByName['Taiwan']?.isTempBattleground ?? false
  );
  const showSEAsiaScore = useAppStore((state) => state.showSEAsiaScore);
  const toggleSEAsiaScore = useAppStore((state) => state.toggleSEAsiaScore);
  const shuttleDiplomacy = useAppStore((state) => state.shuttleDiplomacy);
  const toggleShuttleDiplomacy = useAppStore((state) => state.toggleShuttleDiplomacy);
  const { colors } = useColorScheme();
  const { t } = useTranslation();

  return (
    <View className="mb-3 gap-3 rounded-xl border border-border bg-card px-4 py-3">
      <Text variant="label" className="text-muted-foreground">
        {t('ui.specialActions')}
      </Text>

      {/* Switch per formosan resolution */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Icon
            type="MaterialCommunityIcons"
            name="sword-cross"
            size="body"
            color={colors.foreground}
          />
          <Text variant="body">{t('ui.formosanResolution')}</Text>
        </View>
        {/* TODO: richiamare la funzione del dominio per la Risoluzione di Formosa quando sarà implementata in @tdataroot/tst-domain */}
        <Switch
          value={isTaiwanBattleground}
          onValueChange={() => toggleBattleground('Taiwan')}
          trackColor={{ false: colors.grey4, true: colors.primary }}
          thumbColor="white"
        />
      </View>

      {/* Switch per shuttle diplomacy */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Icon
            type="MaterialCommunityIcons"
            name="airplane"
            size="body"
            color={colors.foreground}
          />
          <Text variant="body">{t('ui.shuttleDiplomacy')}</Text>
        </View>
        <Switch
          value={shuttleDiplomacy}
          onValueChange={() => {
            // TODO: richiamare la funzione del dominio per la Shuttle Diplomacy
            // quando sarà implementata in @tdataroot/tst-domain
            toggleShuttleDiplomacy();
          }}
          trackColor={{ false: colors.grey4, true: colors.primary }}
          thumbColor="white"
        />
      </View>

      {/* Switch per SE Asia Score */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Icon
            type="MaterialCommunityIcons"
            name="map-marker-radius"
            size="body"
            color={colors.foreground}
          />
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
