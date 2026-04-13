import { View } from 'react-native';
import { PickerInfluence } from '~/components/partials';
import { Text } from '~/components/ui';
import { cn } from '~/lib/cn';
import { useAppStore } from '~/store';
import { CountryType, PowerType } from '@fzt/tst-domain';

export const CountryItem = ({ country }: { country: CountryType }) => {
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
          'w-28 items-center justify-center rounded-2xl p-2',
          country.isBattleground ? 'bg-purple-950' : 'bg-yellow-100'
        )}>
        <Text
          variant={'label'}
          className={cn(country.isBattleground ? 'text-white' : 'text-gray-900')}>
          {country.name}
        </Text>
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
