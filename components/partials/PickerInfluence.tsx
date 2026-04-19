import React, { useState, useEffect, useRef } from 'react';
import { View, Pressable } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Text } from '~/components/ui';
import * as Haptic from 'expo-haptics';

interface PickerProps {
  min: number;
  max: number;
  value?: number;
  className?: string;
  onChange: (n: number) => void;
}

const STEP_PX = 28;

export const PickerInfluence = ({ min, max, value = min, className, onChange }: PickerProps) => {
  const [currentValue, setCurrentValue] = useState(value);
  const currentValueRef = useRef(value);
  const lastStepX = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    currentValueRef.current = value;
    setCurrentValue(value);
  }, [value]);

  const gesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-5, 5])
    .onUpdate((e) => {
      const diff = e.translationX - lastStepX.value;

      if (diff >= STEP_PX && currentValueRef.current > min) {
        lastStepX.set(lastStepX.value + STEP_PX);
        currentValueRef.current -= 1;
        setCurrentValue(currentValueRef.current);
        scale.set(withSequence(withTiming(1.35, { duration: 60 }), withTiming(1, { duration: 80 })));
        Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light);
      } else if (diff <= -STEP_PX && currentValueRef.current < max) {
        lastStepX.set(lastStepX.value - STEP_PX);
        currentValueRef.current += 1;
        setCurrentValue(currentValueRef.current);
        scale.set(withSequence(withTiming(1.35, { duration: 60 }), withTiming(1, { duration: 80 })));
        Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light);
      }
    })
    .onEnd(() => {
      lastStepX.set(0);
      onChange(currentValueRef.current);
    })
    .runOnJS(true);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const bump = () => {
    scale.set(withSequence(withTiming(1.35, { duration: 60 }), withTiming(1, { duration: 80 })));
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light);
  };

  const decrement = () => {
    if (currentValueRef.current <= min) return;
    currentValueRef.current -= 1;
    setCurrentValue(currentValueRef.current);
    bump();
    onChange(currentValueRef.current);
  };

  const increment = () => {
    if (currentValueRef.current >= max) return;
    currentValueRef.current += 1;
    setCurrentValue(currentValueRef.current);
    bump();
    onChange(currentValueRef.current);
  };

  return (
    <GestureDetector gesture={gesture}>
      <View
        style={{ overflow: 'hidden' }}
        className={`h-11 w-20 web:h-14 web:w-32 flex-row items-center justify-between rounded-xl border px-2 web:px-4 ${className ?? 'border-border bg-card'}`}>
        <Pressable onPress={decrement} hitSlop={8} className="items-center justify-center">
          <Text className="text-lg web:text-2xl text-muted-foreground leading-none">‹</Text>
        </Pressable>
        <Animated.View style={animatedStyle} className="items-center justify-center">
          <Text variant="body" weight="bold" className={`web:text-xl leading-none${currentValue === 0 ? ' text-muted-foreground' : ''}`}>{currentValue}</Text>
        </Animated.View>
        <Pressable onPress={increment} hitSlop={8} className="items-center justify-center">
          <Text className="text-lg web:text-2xl text-muted-foreground leading-none">›</Text>
        </Pressable>
      </View>
    </GestureDetector>
  );
};
