import { useEffect, useRef } from 'react';
import { Pressable, View, type PressableProps, type ViewProps } from 'react-native';
import { Icon } from '~/components/ui/Icon';
import { cn } from '~/lib/cn';
import { useColorScheme } from '~/lib/useColorScheme';

type StepperProps = Omit<ViewProps, 'children'> & {
  minusButton?: Omit<PressableProps, 'children'>;
  plusButton?: Omit<PressableProps, 'children'>;
};

function Stepper({ className, minusButton, plusButton, ...props }: StepperProps) {
  const { colors } = useColorScheme();

  // Refs to manage repeating presses for minus and plus buttons
  const minusInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const minusTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const plusInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const plusTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (minusTimeout.current) clearTimeout(minusTimeout.current);
      if (minusInterval.current) clearInterval(minusInterval.current);
      if (plusTimeout.current) clearTimeout(plusTimeout.current);
      if (plusInterval.current) clearInterval(plusInterval.current);
    };
  }, []);

  const startRepeating = (
    handler: () => void,
    timeoutRef: { current: ReturnType<typeof setTimeout> | null },
    intervalRef: { current: ReturnType<typeof setInterval> | null }
  ) => {
    // immediate action
    handler();
    // after a short delay, start repeating
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        handler();
      }, 120);
    }, 400);
  };

  const stopRepeating = (
    timeoutRef: { current: ReturnType<typeof setTimeout> | null },
    intervalRef: { current: ReturnType<typeof setInterval> | null }
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Avoid spreading native press handlers so we can implement hold-to-repeat
  const { onPress: minusOnPress, onPressIn: minusOnPressIn, onPressOut: minusOnPressOut, ...minusRest } =
    (minusButton || {}) as PressableProps;
  const { onPress: plusOnPress, onPressIn: plusOnPressIn, onPressOut: plusOnPressOut, ...plusRest } =
    (plusButton || {}) as PressableProps;

  const handleMinusPressIn: PressableProps['onPressIn'] = (e) => {
    minusOnPressIn?.(e);
    if (minusOnPress) startRepeating(() => minusOnPress(e), minusTimeout, minusInterval);
  };

  const handleMinusPressOut: PressableProps['onPressOut'] = (e) => {
    minusOnPressOut?.(e);
    stopRepeating(minusTimeout, minusInterval);
  };

  const handlePlusPressIn: PressableProps['onPressIn'] = (e) => {
    plusOnPressIn?.(e);
    if (plusOnPress) startRepeating(() => plusOnPress(e), plusTimeout, plusInterval);
  };

  const handlePlusPressOut: PressableProps['onPressOut'] = (e) => {
    plusOnPressOut?.(e);
    stopRepeating(plusTimeout, plusInterval);
  };

  return (
    <View
      className={cn(
        'flex-row items-center overflow-hidden rounded-full border border-border',
        className
      )}
      {...props}>
      <Pressable
        {...(minusRest as PressableProps)}
        onPressIn={handleMinusPressIn}
        onPressOut={handleMinusPressOut}
        className={cn('h-8 justify-center px-5', minusButton?.className)}>
        <Icon name="minus" type="MaterialCommunityIcons" size={20} color={colors.foreground} />
      </Pressable>

      <View className="h-8 w-px rounded-full bg-border" />

      <Pressable
        {...(plusRest as PressableProps)}
        onPressIn={handlePlusPressIn}
        onPressOut={handlePlusPressOut}
        className={cn('h-8 justify-center px-5', plusButton?.className)}>
        <Icon name="plus" type="MaterialCommunityIcons" size={20} color={colors.foreground} />
      </Pressable>
    </View>
  );
}

export { Stepper };
