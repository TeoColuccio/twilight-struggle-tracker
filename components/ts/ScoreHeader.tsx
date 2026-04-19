import { View, Vibration } from 'react-native';
import { Text, Stepper } from '~/components/ui';
import { useAppStore } from '~/store';

export const ScoreHeader = () => {
  const currentScore = useAppStore((state) => state.data.currentScore);
  const updateCurrentScore = useAppStore((state) => state.updateCurrentScore);

  const isUSA = currentScore > 0;
  const isURSS = currentScore < 0;
  const scoreColor = isUSA ? 'text-blue-400' : isURSS ? 'text-red-400' : 'text-foreground';
  const winner = isUSA ? 'USA' : isURSS ? 'URSS' : null;

  return (
    <View className="mb-4 overflow-hidden rounded-2xl border border-border bg-card">
      {/* USA / URSS faction banner */}
      <View className="flex-row border-b border-border">
        <View className="w-1/2 items-center py-2 bg-blue-600/10 border-r border-border">
          <Text variant="label" className="text-blue-400 tracking-wider">USA</Text>
        </View>
        <View className="w-1/2 items-center py-2 bg-red-600/10">
          <Text variant="label" className="text-red-400 tracking-wider">URSS</Text>
        </View>
      </View>

      {/* Score row */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <View>
          <Text variant="label" className="text-muted-foreground mb-1">Punti Vittoria</Text>
          <View className="flex-row items-baseline gap-2">
            <Text variant="display" className={scoreColor}>
              {Math.abs(currentScore)}
            </Text>
            {winner ? (
              <Text variant="body" weight="bold" className={scoreColor}>{winner}</Text>
            ) : (
              <Text variant="label" className="text-muted-foreground">Pareggio</Text>
            )}
          </View>
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
    </View>
  );
};
