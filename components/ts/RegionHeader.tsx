import { View, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Icon, Text } from '~/components/ui';
import { cn } from '~/lib/cn';
import { RegionType } from '@fzt/tst-domain';

interface RegionHeaderProps {
  region: RegionType;
  isExpanded: boolean;
  onPress: () => void;
}

export const RegionHeader = ({ region, isExpanded, onPress }: RegionHeaderProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: withTiming(isExpanded ? '90deg' : '0deg', { duration: 200 }) }],
  }));

  const { potentialScore } = region;
  const displayScore = Math.abs(potentialScore);
  let bgColor = '';
  if (potentialScore > 0) bgColor = 'bg-blue-500';
  else if (potentialScore < 0) bgColor = 'bg-red-500';

  return (
    <View className="mb-2 rounded-2xl bg-card">
      <Pressable className="flex-row items-center justify-between p-4" onPress={onPress}>
        <View className={cn('rounded-full w-8 h-8 items-center justify-center', bgColor)}>
          <Text variant="heading" className="text-white">
            {displayScore}
          </Text>
        </View>

        <Text variant="heading">{region.name}</Text>

        <Animated.View style={animatedStyle}>
          <Icon name="arrow-right" />
        </Animated.View>
      </Pressable>
    </View>
  );
};
