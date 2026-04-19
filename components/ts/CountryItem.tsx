import { memo } from 'react';
import { View } from 'react-native';
import { PickerInfluence } from '~/components/partials';
import { Text } from '~/components/ui';
import { cn } from '~/lib/cn';
import { useAppStore } from '~/store';
import { CountryType, PowerType } from '@tdataroot/tst-domain';

const CountryItemComponent = ({ country }: { country: CountryType }) => {
  const setInfluence = useAppStore((state) => state.setInfluence);

  return (
    <View className="flex-row items-center justify-center gap-6 p-2">
      <PickerInfluence
        className={country.controlledBy === PowerType.USA ? 'bg-blue-500' : undefined}
        max={30}
        min={0}
        value={country.blueInfluence}
        onChange={(value) => setInfluence(country.name, PowerType.USA, value)}
      />

      <View
        className={cn(
          'w-28 web:w-44 items-center justify-center rounded-2xl p-2 web:p-3',
          country.isBattleground || country.isTempBattleground ? 'bg-purple-950' : 'bg-yellow-100'
        )}>
        <Text
          variant={'label'}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.1}
          className={cn('web:text-base', country.isBattleground || country.isTempBattleground ? 'text-white' : 'text-gray-900')}>
          {country.name}
        </Text>
        <View className="mt-1 flex-row gap-1">
          {Array.from({ length: country.stability }).map((_, i) => (
            <View
              key={i}
              className={cn(
                'h-2 w-2 web:h-3 web:w-3 rounded-full',
                country.isBattleground || country.isTempBattleground ? 'bg-purple-300' : 'bg-amber-500'
              )}
            />
          ))}
        </View>
        {/* Taiwan battleground toggle spostato in CardOptionsPanel */}
      </View>

      <PickerInfluence
        className={country.controlledBy === PowerType.URSS ? 'bg-red-500' : undefined}
        max={30}
        min={0}
        value={country.redInfluence}
        onChange={(value) => setInfluence(country.name, PowerType.URSS, value)}
      />
    </View>
  );
};

export const CountryItem = memo(CountryItemComponent);
