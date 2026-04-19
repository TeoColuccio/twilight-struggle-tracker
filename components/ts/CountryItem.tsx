import { memo } from 'react';
import { View } from 'react-native';
import { PickerInfluence } from '~/components/partials';
import { Text } from '~/components/ui';
import { cn } from '~/lib/cn';
import { useAppStore } from '~/store';
import { CountryType, PowerType } from '@tdataroot/tst-domain';
import { useTranslation } from 'react-i18next';

const CountryItemComponent = ({ country }: { country: CountryType }) => {
  const setInfluence = useAppStore((state) => state.setInfluence);
  const isBattleground = country.isBattleground || country.isTempBattleground;
  const { t } = useTranslation();

  return (
    <View className="flex-row items-center justify-center gap-3 web:gap-6 px-2 py-1.5">
      <PickerInfluence
        className={country.controlledBy === PowerType.USA ? 'bg-blue-500/80 border-blue-400' : undefined}
        max={30}
        min={0}
        value={country.blueInfluence}
        onChange={(value) => setInfluence(country.name, PowerType.USA, value)}
      />

      <View
        className={cn(
          'w-28 web:w-44 items-center justify-center rounded-xl border p-2 web:p-3',
          isBattleground
            ? 'border-violet-500/40 bg-violet-950/70'
            : 'border-border bg-card'
        )}>
        <Text
          variant={'label'}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.1}
          className={cn('web:text-base', isBattleground ? 'text-violet-200' : 'text-foreground')}>
          {t('countries.' + country.name)}
        </Text>
        <View className="mt-1 flex-row gap-1">
          {Array.from({ length: country.stability }).map((_, i) => (
            <View
              key={i}
              className={cn(
                'h-1.5 w-1.5 web:h-2 web:w-2 rounded-full',
                isBattleground ? 'bg-violet-400' : 'bg-muted-foreground'
              )}
            />
          ))}
        </View>
      </View>

      <PickerInfluence
        className={country.controlledBy === PowerType.URSS ? 'bg-red-500/80 border-red-400' : undefined}
        max={30}
        min={0}
        value={country.redInfluence}
        onChange={(value) => setInfluence(country.name, PowerType.URSS, value)}
      />
    </View>
  );
};

export const CountryItem = memo(CountryItemComponent);
