import { Tabs, Href } from 'expo-router';
import { View } from 'react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { TabBarIcon } from '~/components/partials';
import { Icon, Text } from '~/components/ui';

type TabsProps = BottomTabNavigationOptions & {
  href?: Href | null;
};

export default function TabLayout() {
  const { colors } = useColorScheme();

  const SCREEN_OPTIONS = {
    headerStyle: {
      backgroundColor: colors.background,
    },
    headerShown: true,
    headerShadowVisible: false,
    headerTitleContainerStyle: { marginLeft: 24 },
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: '700' as const,
      letterSpacing: 0.5,
    },
  } as TabsProps;

  const INDEX_OPTIONS = {
    ...SCREEN_OPTIONS,
    headerTitle: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Icon type="MaterialCommunityIcons" name="radioactive" size={22} color={colors.primary} />
        <Text variant="body" weight="bold" style={{ color: colors.foreground, letterSpacing: 0.5 }}>
          TS Tracker
        </Text>
      </View>
    ),
    tabBarIcon: ({ focused, size }) => (
      <TabBarIcon type="FontAwesome5" name="calculator" active={focused} />
    ),
  } as TabsProps;

  // const DONATE_OPTIONS = {
  //   ...SCREEN_OPTIONS,
  //   title: 'Donate',
  //   tabBarIcon: ({ focused, size }) => (
  //     <TabBarIcon type="FontAwesome5" name="donate" active={focused} />
  //   ),
  // } as TabsProps;

  return (
    // Tab bar nascosta temporaneamente (schermata singola). Rimuovere tabBarStyle quando si aggiungono altre tab.
    <Tabs screenOptions={{ tabBarStyle: { display: 'none' } }}>
      <Tabs.Screen name="index" options={INDEX_OPTIONS} />
      {/* <Tabs.Screen name="two" options={DONATE_OPTIONS} /> */}
    </Tabs>
  );
}
