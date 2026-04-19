import { View, TextInput, Pressable } from 'react-native';
import { Icon } from '~/components/ui';
import { useColorScheme } from '~/lib/useColorScheme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  const { colors } = useColorScheme();
  const hasValue = value.trim().length > 0;

  return (
    <View className="flex-row items-center rounded-xl border border-border bg-card px-3 mb-3 h-11 web:h-12 gap-2">
      <Icon type="MaterialCommunityIcons" name="magnify" size="body" color={colors.grey2} />
      <TextInput
        className="flex-1 text-sm web:text-base text-foreground"
        // @ts-ignore – outline non esiste nei tipi RN ma è valido su web
        style={{ outline: 'none' }}
        placeholder="Cerca stato..."
        placeholderTextColor={colors.grey2}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        clearButtonMode="never"
        autoCorrect={false}
        autoCapitalize="none"
      />
      {hasValue && (
        <Pressable onPress={() => onChangeText('')} hitSlop={8}>
          <Icon type="MaterialCommunityIcons" name="close-circle" size="body" color={colors.grey2} />
        </Pressable>
      )}
    </View>
  );
};
