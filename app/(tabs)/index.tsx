import { useState, useLayoutEffect, useMemo } from 'react';
import { View, SectionList } from 'react-native';
import { useNavigation } from 'expo-router';
import { useAppStore } from '~/store';
import { CountryItem, RegionHeader, ScoreHeader, ResetConfirmModal, SettingsModal, TrackerHeaderActions } from '~/components/ts';

export default function Index() {
  const navigation = useNavigation();
  const data = useAppStore((state) => state.data);
  const clearInfluences = useAppStore((state) => state.clearInfluences);

  const sections = useMemo(
    () =>
      Object.entries(data.regionsById).map(([regionId, region]) => ({
        regionId,
        region,
        data: Object.values(data.countriesByName).filter((c) => c.regionId === regionId),
      })),
    [data]
  );

  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TrackerHeaderActions
          onResetPress={() => setResetModalVisible(true)}
          onSettingsPress={() => setSettingsModalVisible(true)}
        />
      ),
    });
  }, [navigation]);

  const handleToggle = (regionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(regionId) ? prev.filter((id) => id !== regionId) : [...prev, regionId]
    );
  };

  return (
    <View className="flex-1 px-4">
      <SectionList
        ListHeaderComponent={<ScoreHeader />}
        stickySectionHeadersEnabled={false}
        sections={sections}
        keyExtractor={(item) => item.name}
        extraData={expandedSections}
        renderItem={({ section, item }) => {
          if (!expandedSections.includes(section.regionId)) return null;
          return <CountryItem country={item} />;
        }}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section }) => (
          <RegionHeader
            region={section.region}
            isExpanded={expandedSections.includes(section.regionId)}
            onPress={() => handleToggle(section.regionId)}
          />
        )}
      />

      <ResetConfirmModal
        visible={resetModalVisible}
        onConfirm={clearInfluences}
        onClose={() => setResetModalVisible(false)}
      />

      <SettingsModal
        visible={settingsModalVisible}
        onClose={() => setSettingsModalVisible(false)}
      />
    </View>
  );
}
