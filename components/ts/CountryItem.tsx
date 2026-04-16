import { memo } from 'react';
import { View, Pressable } from 'react-native';
import { PickerInfluence } from '~/components/partials';
import { Text } from '~/components/ui';
import { cn } from '~/lib/cn';
import { useAppStore } from '~/store';
import { CountryType, PowerType } from '@fzt/tst-domain';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CountryItemComponent = ({ country }: { country: CountryType }) => {
  const setInfluence = useAppStore((state) => state.setInfluence);
  const toggleBattleground = useAppStore((state) => state.toggleBattleground);

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
        {country.name === 'Taiwan' && (
          <Pressable
            onPress={() => toggleBattleground(country.name)}
            className={cn(
              'mt-2 flex-row items-center gap-1 rounded-full px-2 py-0.5',
              country.isTempBattleground ? 'bg-orange-500' : 'bg-gray-400/30'
            )}>
            <MaterialCommunityIcons
              name="sword-cross"
              size={12}
              color={country.isTempBattleground ? '#fff' : '#9ca3af'}
            />
            <Text
              variant={'label'}
              className={cn(
                'text-xs',
                country.isTempBattleground ? 'text-white' : 'text-gray-400'
              )}>
              Battleground
            </Text>
          </Pressable>
        )}
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
