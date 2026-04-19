import { View } from 'react-native';
import { Icon } from '~/components/ui';
import { Button } from '~/components/nativewindui/Button';

interface TrackerHeaderActionsProps {
  onResetPress?: () => void;
  onSettingsPress?: () => void;
}

export const TrackerHeaderActions = ({ onResetPress, onSettingsPress }: TrackerHeaderActionsProps) => (
  <View className="mr-4 flex-row gap-2">
    <Button variant="plain" className="rounded-full w-9 h-9 items-center justify-center" size={'icon'} onPress={onSettingsPress}>
      <Icon type="MaterialCommunityIcons" name="cog-outline" size={22} />
    </Button>
    <Button variant="plain" className="rounded-full w-9 h-9 items-center justify-center" size={'icon'} onPress={onResetPress}>
      <Icon type="MaterialCommunityIcons" name="trash-can-outline" size={22} color="#ef4444" />
    </Button>
  </View>
);
