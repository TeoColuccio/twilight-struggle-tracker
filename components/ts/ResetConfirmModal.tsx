import { View, Animated, Modal, Pressable } from 'react-native';
import { Text, Icon } from '~/components/ui';
import { Button } from '~/components/nativewindui/Button';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { useColorScheme } from '~/lib/useColorScheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const ResetConfirmModal = ({ visible, onConfirm, onClose }: Props) => {
  const { t } = useTranslation();
  const { colors } = useColorScheme();
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(-400)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
        speed: 20,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -400,
        duration: 220,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      {/* Backdrop */}
      <Pressable
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}
        onPress={onClose}
      />

      {/* Panel slides in from top */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          transform: [{ translateY: slideAnim }],
          paddingTop: insets.top,
          backgroundColor: colors.card,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          borderBottomWidth: 1,
          borderColor: colors.grey4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 10,
        }}>
        <View style={{ paddingHorizontal: 24, paddingBottom: 8 }}>
          <View style={{ alignItems: 'center', gap: 12, paddingVertical: 20 }}>
            <View style={{ borderRadius: 16, backgroundColor: 'rgba(239,68,68,0.15)', padding: 20 }}>
              <Icon type="MaterialCommunityIcons" name="alert-circle-outline" size="display" color="#ef4444" />
            </View>
            <Text variant="heading" weight="bold">{t('ui.resetInfluences')}</Text>
            <Text variant="body" style={{ textAlign: 'center', color: colors.grey2 }}>
              {t('ui.resetConfirmMessage')}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'center', paddingBottom: 8 }}>
            <Button variant="secondary" size="lg" className="w-36" onPress={onClose}>
              <Text variant="label" className="text-center">{t('ui.cancel')}</Text>
            </Button>
            <Button size="lg" className="w-36 bg-red-500" onPress={handleConfirm}>
              <Text variant="label" className="text-white text-center">{t('ui.reset')}</Text>
            </Button>
          </View>
        </View>

        {/* Handle at bottom */}
        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
          <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: colors.grey4 }} />
        </View>
      </Animated.View>
    </Modal>
  );
};
