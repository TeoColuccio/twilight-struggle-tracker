import { View } from 'react-native';
import { Icon } from '~/components/ui';
import { Button } from '~/components/nativewindui/Button';

interface TrackerHeaderActionsProps {
  onResetPress?: () => void;
  onSettingsPress?: () => void;
}

export const TrackerHeaderActions = ({ onResetPress, onSettingsPress }: TrackerHeaderActionsProps) => (
  <View className="mr-6 flex-row gap-4">
    <Button variant="plain" className="w-fit" size={'icon'} onPress={onSettingsPress}>
      <Icon type="MaterialCommunityIcons" name="cog" />
    </Button>
    
    <Button variant="plain" className="w-fit" size={'icon'} onPress={onResetPress}>
      <Icon type="MaterialCommunityIcons" name="trash-can" color="#ef4444" />
    </Button>

  </View>
);
