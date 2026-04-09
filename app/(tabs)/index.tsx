import { useState } from 'react';
import { View, SectionList } from 'react-native';
import { Text, Icon } from '~/components/ui';
import { Button } from '~/components/nativewindui/Button';
import { useTrackerStore } from '~/store/tracker';
import { RegionId } from '~/store/types';
import { CountryItem, RegionHeader, ScoreHeader, ResetConfirmModal } from '~/components/ts';

export default function Index() {
  const { regions, countries, clearInfluences } = useTrackerStore();

  const sections = Object.entries(regions).map(([regionId, region]) => ({
    regionId: regionId as RegionId,
    title: region.name,
    data: countries.filter((c) => c.region === regionId),
  }));

  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [resetModalVisible, setResetModalVisible] = useState(false);

  const handleToggle = (regionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(regionId) ? prev.filter((id) => id !== regionId) : [...prev, regionId]
    );
  };

  return (
    <View className="flex-1 px-4">
      <SectionList
        ListHeaderComponent={<ScoreHeader />}
        stickySectionHeadersEnabled
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
            title={section.title}
            regionId={section.regionId}
            isExpanded={expandedSections.includes(section.regionId)}
            onPress={() => handleToggle(section.regionId)}
          />
        )}
      />

      <View className="mb-8 items-center px-4">
        <Button
          variant="secondary"
          size="md"
          onPress={() => setResetModalVisible(true)}>
          <Icon name="refresh" type="MaterialCommunityIcons" size="body" />
          <Text variant="label">Reset influenze</Text>
        </Button>
      </View>

      <ResetConfirmModal
        visible={resetModalVisible}
        onConfirm={clearInfluences}
        onClose={() => setResetModalVisible(false)}
      />
    </View>
  );
}
