import { View, Platform } from 'react-native';
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
    <SheetModal visible={visible} onClose={onClose} enableDynamicSizing>
      <BottomSheetView style={{ paddingBottom: Platform.select({ web: 120, default: 96 }) }} className="px-6 pt-4">
        <View className="items-center gap-3 pb-6">
          <View className="rounded-2xl bg-red-500/15 p-5">
            <Icon type="MaterialCommunityIcons" name="alert-circle-outline" size="display" color="#ef4444" />
          </View>
          <Text variant="heading" weight="bold">Reset influenze</Text>
          <Text variant="body" className="text-center text-muted-foreground">
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
