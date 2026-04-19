import { View, Vibration, Pressable } from 'react-native';
import { Text } from '~/components/ui';
import { useAppStore } from '~/store';
import { useTranslation } from 'react-i18next';

export const ScoreHeader = () => {
  const currentScore = useAppStore((state) => state.data.currentScore);
  const updateCurrentScore = useAppStore((state) => state.updateCurrentScore);
  const { t } = useTranslation();

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
          <Text variant="label" className="text-muted-foreground mb-1">{t('ui.victoryPoints')}</Text>
          <View className="flex-row items-baseline gap-2">
            <Text variant="display" className={scoreColor}>
              {Math.abs(currentScore)}
            </Text>
            {winner ? (
              <Text variant="body" weight="bold" className={scoreColor}>{winner}</Text>
            ) : (
              <Text variant="label" className="text-muted-foreground">{t('ui.draw')}</Text>
            )}
          </View>
        </View>

        <View className="flex-row gap-2">
          {/* +1 USA: score sale */}
          <Pressable
            onPress={() => { Vibration.vibrate(20); updateCurrentScore(1); }}
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            className="w-16 items-center justify-center rounded-xl border border-blue-500/40 bg-blue-500/10 py-2">
            <Text variant="label" weight="bold" className="text-blue-400">+1</Text>
            <Text variant="label" className="text-blue-400/70">USA</Text>
          </Pressable>

          {/* +1 URSS: score scende */}
          <Pressable
            onPress={() => { Vibration.vibrate(20); updateCurrentScore(-1); }}
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            className="w-16 items-center justify-center rounded-xl border border-red-500/40 bg-red-500/10 py-2">
            <Text variant="label" weight="bold" className="text-red-400">+1</Text>
            <Text variant="label" className="text-red-400/70">URSS</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
