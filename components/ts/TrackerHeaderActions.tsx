import { View } from 'react-native';
import { Icon } from '~/components/ui';
import { Button } from '~/components/nativewindui/Button';

export const TrackerHeaderActions = () => (
  <View className="mr-6 flex-row gap-4">
    <Button variant="plain" className="w-fit" size={'icon'} onPress={() => {}}>
      <Icon type="MaterialCommunityIcons" name="radioactive-circle" color="#ff0" />
    </Button>
    <Button variant="plain" className="w-fit" size={'icon'}>
      <Icon type="MaterialCommunityIcons" name="cog" />
    </Button>
  </View>
);
