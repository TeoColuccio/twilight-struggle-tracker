import { View } from 'react-native';
import { PickerInfluence } from '~/components/partials';
import { Text } from '~/components/ui';
import { cn } from '~/lib/cn';
import { useTrackerStore } from '~/store/tracker';
import { Country, Power } from '~/store/types';

export const CountryItem = ({ country }: { country: Country }) => {
  const { setInfluence } = useTrackerStore();

  return (
    <View className="flex-row items-center justify-center gap-6 p-2">
      <PickerInfluence
        className={country.controlledBy === Power.USA && 'bg-blue-500'}
        max={10}
        min={0}
        value={country.blueInfluence}
        onChange={(newBlueInfluence) => {
          setInfluence(country.name, 'blue', newBlueInfluence);
        }}
      />

      <View
        className={cn(
          'w-28 items-center justify-center rounded-2xl p-2',
          country.battleground ? 'bg-purple-950' : 'bg-yellow-100'
        )}>
        <Text
          variant={'label'}
          className={cn(country.battleground ? 'text-foreground' : 'text-background')}>
          {country.name}
        </Text>
      </View>

      <PickerInfluence
        className={country.controlledBy === Power.URSS && 'bg-red-500'}
        max={10}
        min={0}
        value={country.redInfluence}
        onChange={(newRedInfluence) => {
          setInfluence(country.name, 'red', newRedInfluence);
        }}
      />
    </View>
  );
};
