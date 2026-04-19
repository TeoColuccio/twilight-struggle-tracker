import { useMemo } from 'react';
import { View, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Icon, Text } from '~/components/ui';
import { RegionType, PowerType } from '@tdataroot/tst-domain';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '~/store';

interface RegionHeaderProps {
  region: RegionType;
  isExpanded: boolean;
  onPress: () => void;
}

export const RegionHeader = ({ region, isExpanded, onPress }: RegionHeaderProps) => {
  const { t } = useTranslation();
  const showSEAsiaScore = useAppStore((state) => state.showSEAsiaScore);
  const countriesByName = useAppStore((state) => state.data.countriesByName);

  const seAsiaScore = useMemo(() => {
    if (!showSEAsiaScore || region.id !== 'Asia') return null;
    const seAsiaCountries = Object.values(countriesByName).filter((c) => c.isSEAsia);
    let usaPoints = 0;
    let urssPoints = 0;
    seAsiaCountries.forEach((c) => {
      const pts = c.isBattleground ? 2 : 1;
      if (c.controlledBy === PowerType.USA) usaPoints += pts;
      else if (c.controlledBy === PowerType.URSS) urssPoints += pts;
    });
    return usaPoints - urssPoints;
  }, [showSEAsiaScore, countriesByName, region.id]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: withTiming(isExpanded ? '90deg' : '0deg', { duration: 200 }) }],
  }));

  const { potentialScore } = region;
  const displayScore = Math.abs(potentialScore);
  const badgeBg = potentialScore > 0 ? 'bg-blue-500' : potentialScore < 0 ? 'bg-red-500' : 'bg-border';

  const seAsiaDisplayScore = seAsiaScore !== null ? Math.abs(seAsiaScore) : null;
  const seAsiaBadgeBg =
    seAsiaScore === null ? 'bg-border'
    : seAsiaScore > 0 ? 'bg-blue-500'
    : seAsiaScore < 0 ? 'bg-red-500'
    : 'bg-border';

  return (
    <View className="mb-2 overflow-hidden rounded-2xl border border-border bg-card">
      <Pressable className="flex-row items-center justify-between px-4 py-3" onPress={onPress}>
        <View
          className={`h-8 w-8 items-center justify-center rounded-full ${badgeBg}`}
          style={{ overflow: 'hidden' }}>
          <Text variant="label" weight="bold" className="text-white">
            {displayScore}
          </Text>
        </View>

        <View className="flex-1 items-center">
          <Text variant="body" weight="bold">{t('regions.' + region.id)}</Text>
          {seAsiaScore !== null && (
            <View className="mt-1 flex-row items-center gap-2">
              <View
                className={`h-5 min-w-5 items-center justify-center rounded-full px-1 ${seAsiaBadgeBg}`}
                style={{ overflow: 'hidden' }}>
                <Text variant="label" weight="bold" className="text-white">
                  {seAsiaDisplayScore}
                </Text>
              </View>
              <Text variant="label" className="text-muted-foreground">{t('regions.SEAsia')}</Text>
            </View>
          )}
        </View>

        <Animated.View style={animatedStyle}>
          <Icon name="arrow-right" />
        </Animated.View>
      </Pressable>
    </View>
  );
};
