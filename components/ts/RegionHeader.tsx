import { View, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Icon, Text } from '~/components/ui';
import { cn } from '~/lib/cn';
import { useTrackerStore } from '~/store/tracker';
import { RegionId, Power } from '~/store/types';
import { computeRegionScore } from '~/lib/gameCalculations';

interface RegionHeaderProps {
  title: string;
  regionId: RegionId;
  isExpanded: boolean;
  onPress: () => void;
}

export const RegionHeader = ({ title, regionId, isExpanded, onPress }: RegionHeaderProps) => {
  const { regions, countries, regionsStatus } = useTrackerStore();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: withTiming(isExpanded ? '90deg' : '0deg', { duration: 200 }) }],
  }));

  const usaScore = computeRegionScore(regionId, Power.USA, regions, regionsStatus, countries);
  const urssScore = computeRegionScore(regionId, Power.URSS, regions, regionsStatus, countries);

  const diffScore = usaScore - urssScore;
  const displayScore = diffScore !== 0 ? Math.abs(diffScore) : 0;
  let bgColor = '';
  if (diffScore > 0) bgColor = 'bg-blue-500';
  else if (diffScore < 0) bgColor = 'bg-red-500';

  return (
    <View className="mb-2 rounded-2xl bg-card">
      <Pressable className="flex-row items-center justify-between p-4" onPress={onPress}>
        <View className={cn('rounded-full px-3 py-1', bgColor)}>
          <Text variant="heading" className="text-white">
            {displayScore}
          </Text>
        </View>

        <Text variant="heading">{title}</Text>

        <Animated.View style={animatedStyle}>
          <Icon name="arrow-right" />
        </Animated.View>
      </Pressable>
    </View>
  );
};
