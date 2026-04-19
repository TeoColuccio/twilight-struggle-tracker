import { useState, useLayoutEffect, useMemo, useCallback } from 'react';
import { View, SectionList } from 'react-native';
import { useNavigation } from 'expo-router';
import { useAppStore } from '~/store';
import { CountryItem, RegionHeader, ScoreHeader, ResetConfirmModal, SettingsModal, TrackerHeaderActions, SearchBar, CardOptionsPanel } from '~/components/ts';

export default function Index() {
  const navigation = useNavigation();
  const data = useAppStore((state) => state.data);
  const clearInfluences = useAppStore((state) => state.clearInfluences);

  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const isSearching = searchQuery.trim().length > 0;

  const baseSections = useMemo(
    () =>
      Object.entries(data.regionsById).map(([regionId, region]) => ({
        regionId,
        region,
        data: Object.values(data.countriesByName).filter((c) => c.regionId === regionId),
      })),
    [data]
  );

  const sections = useMemo(() => {
    if (isSearching) {
      const query = searchQuery.trim().toLowerCase();
      return baseSections
        .map((section) => ({
          ...section,
          data: section.data.filter((c) => c.name.toLowerCase().includes(query)),
        }))
        .filter((section) => section.data.length > 0);
    }
    return baseSections.map((section) => ({
      ...section,
      data: expandedSections.includes(section.regionId) ? section.data : [],
    }));
  }, [baseSections, expandedSections, searchQuery, isSearching]);

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

  const handleToggle = useCallback((regionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(regionId) ? prev.filter((id) => id !== regionId) : [...prev, regionId]
    );
  }, []);

  const SearchBarComponent = (
    <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
  );

  return (
    <View className="flex-1 px-3 web-content">
      <SectionList
        ListHeaderComponent={
          <>
            <ScoreHeader />
            <CardOptionsPanel />
            {SearchBarComponent}
          </>
        }
        stickySectionHeadersEnabled={false}
        sections={sections}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <CountryItem country={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 24 }}
        renderSectionHeader={({ section }) => (
          isSearching ? (
            <RegionHeader
              region={section.region}
              isExpanded={true}
              onPress={() => {}}
            />
          ) : (
            <RegionHeader
              region={section.region}
              isExpanded={expandedSections.includes(section.regionId)}
              onPress={() => handleToggle(section.regionId)}
            />
          )
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
