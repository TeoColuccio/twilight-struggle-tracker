import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { useColorScheme } from '~/lib/useColorScheme';
import { convertToRGBA } from '~/lib/utils';


interface SheetModalProps {
  visible: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  snapPoints?: string[];
  index?: number;
  enableDynamicSizing?: boolean;
  children?: React.ReactNode;
}

const SheetModal = ({ visible, onClose, onOpen, snapPoints, index = 0, enableDynamicSizing = false, children }: SheetModalProps) => {
  const { colors } = useColorScheme();

  const ref = useRef<BottomSheetModal>(null);
  const isPresented = useRef(false);

  const snapPointInternal = useMemo(() => snapPoints ?? ['25%', '50%', '75%', '95%'], [snapPoints]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  // Callback interna per gestire apertura/chiusura
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        isPresented.current = false;
        onClose?.();
      } else {
        isPresented.current = true;
      }
    },
    [onClose]
  );

  // Gestione apertura in base a "visible"
  useEffect(() => {
    if (visible) {
      ref.current?.present();
      onOpen?.();
    } else if (isPresented.current) {
      ref.current?.dismiss();
    }
  }, [visible]);

  return (
    <BottomSheetModal
      ref={ref}
      index={enableDynamicSizing ? 0 : index}
      {...(enableDynamicSizing ? { enableDynamicSizing: true } : { snapPoints: snapPointInternal })}
      enableBlurKeyboardOnGesture
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{
        backgroundColor: colors.foreground,
        height: 2,
        width: 40,
      }}
      backgroundStyle={{ backgroundColor: colors.card }}>
      {children}
    </BottomSheetModal>
  );
};

export { SheetModal };
