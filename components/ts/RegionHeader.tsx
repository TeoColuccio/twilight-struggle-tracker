import { View, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Icon, Text } from '~/components/ui';
import { RegionType } from '@tdataroot/tst-domain';
import { useTranslation } from 'react-i18next';

interface RegionHeaderProps {
  region: RegionType;
  isExpanded: boolean;
  onPress: () => void;
}

export const RegionHeader = ({ region, isExpanded, onPress }: RegionHeaderProps) => {
  const { t } = useTranslation();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: withTiming(isExpanded ? '90deg' : '0deg', { duration: 200 }) }],
  }));

  const { potentialScore } = region;
  const displayScore = Math.abs(potentialScore);
  const badgeBg = potentialScore > 0 ? 'bg-blue-500' : potentialScore < 0 ? 'bg-red-500' : 'bg-border';

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

        <Text variant="body" weight="bold">{t(region.name)}</Text>

        <Animated.View style={animatedStyle}>
          <Icon name="arrow-right" />
        </Animated.View>
      </Pressable>
    </View>
  );
};
