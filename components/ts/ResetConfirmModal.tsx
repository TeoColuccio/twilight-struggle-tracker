import { View } from 'react-native';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetModal } from '~/components/partials';
import { Text, Icon } from '~/components/ui';
import { Button } from '~/components/nativewindui/Button';

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const ResetConfirmModal = ({ visible, onConfirm, onClose }: Props) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <SheetModal visible={visible} onClose={onClose} snapPoints={['50%']} index={0}>
      <BottomSheetView className="flex-1 px-6 pb-8 pt-4">
        <View className="items-center gap-3 pb-6">
          <View className="rounded-full bg-red-500/20 p-4">
            <Icon type="MaterialCommunityIcons" name="alert-circle-outline" size="display" color="#ef4444" />
          </View>
          <Text variant="heading">Reset influenze</Text>
          <Text variant="body" className="text-center">
            Sei sicuro di voler azzerare tutte le influenze?{`\n`}L'operazione non è reversibile.
          </Text>
        </View>

        <View className="flex-row gap-3 justify-center">
          <Button variant="secondary" size="lg" className="w-36" onPress={onClose}>
            <Text variant="label" className="text-center">
              Annulla
            </Text>
          </Button>
          <Button size="lg" className="w-36 bg-red-500" onPress={handleConfirm}>
            <Text variant="label" className="text-white text-center">
              Reset
            </Text>
          </Button>
        </View>
      </BottomSheetView>
    </SheetModal>
  );
};
