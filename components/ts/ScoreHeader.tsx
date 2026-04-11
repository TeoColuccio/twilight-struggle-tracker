import { View, Vibration } from 'react-native';
import { Text, Stepper } from '~/components/ui';
import { useAppStore } from '~/store';

export const ScoreHeader = () => {
  const currentScore = useAppStore((state) => state.data.currentScore);
  const updateCurrentScore = useAppStore((state) => state.updateCurrentScore);

  // currentScore > 0 → USA winning (blue), < 0 → URSS winning (red), = 0 → neutral
  const scoreColor =
    currentScore > 0 ? 'text-blue-500' : currentScore < 0 ? 'text-red-500' : 'text-foreground';

  const winner = currentScore > 0 ? 'USA' : currentScore < 0 ? 'URSS' : null;

  return (
    <View className="mb-4 flex-row items-end justify-between rounded-2xl p-4">
      <View>
        <Text variant={'label'} className="text-muted-foreground">
          Punteggio
        </Text>
        <Text variant={'heading'} className={scoreColor}>
          {Math.abs(currentScore)}
          {winner ? `  ${winner}` : ''}
        </Text>
      </View>

      <Stepper
        minusButton={{
          onPress: () => {
            Vibration.vibrate(20);
            updateCurrentScore(-1);
          },
        }}
        plusButton={{
          onPress: () => {
            Vibration.vibrate(20);
            updateCurrentScore(1);
          },
        }}
      />
    </View>
  );
};
