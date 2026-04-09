import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';

import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const THUMB_WIDTH = width * 0.42;
const THUMB_HEIGHT = THUMB_WIDTH * 0.65;

const continueWatching = [
  { id: '1', title: 'Ang Alamat ng Pinya', progress: 0.6 },
];

const fables = [
  { id: '1', title: 'Ang Pagong at ang Matsing' },
  { id: '2', title: 'Ang Aso at ang Uwak' },
  { id: '3', title: 'Ang Langgam at ang Tipaklong' },
  { id: '4', title: 'Ang Palaka at ang Baka' },
];

const alamat = [
  { id: '5', title: 'Alamat ng Sapatos' },
  { id: '6', title: 'Alamat ng Makahiya' },
  { id: '7', title: 'Alamat ng Mais' },
  { id: '8', title: 'Alamat ng Rosas' },
];

const classics = [
  { id: '9', title: 'Ibong Adarna' },
  { id: '10', title: 'El Filibusterismo' },
  { id: '11', title: 'Noli Me Tangere' },
  { id: '12', title: 'Biag Ni Liam Ang' },
];

function ThumbnailCard({ item, onPress }: { item: any; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.thumbnail}>
        <View style={styles.playButton}>
          <Text style={styles.playIcon}>▶</Text>
        </View>
      </View>
      <Text style={styles.cardTitle} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
}

function ContinueCard({ item, onPress }: { item: any; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.continueCard} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.continueThumbnail}>
        <View style={styles.playButton}>
          <Text style={styles.playIcon}>▶</Text>
        </View>
      </View>
      <Text style={styles.continueTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${item.progress * 100}%` }]} />
      </View>
    </TouchableOpacity>
  );
}

export default function BrowseStoriesScreen({ navigation }: any) {
  const router = useRouter();


  const handleVideoPress = (item: any) => {
    router.push({
      pathname: '/VideoPlayer',
      params: { title: item.title },
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Top Bar */}
      <View style={styles.topBar}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Find a Story"
            placeholderTextColor="#999"
          />
        </View>

        {/* Filter Buttons Row */}
        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
            <Text style={styles.filterIcon}>♡</Text>
            <Text style={styles.filterText}>Favorites</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
            <Text style={styles.filterIcon}>🕐</Text>
            <Text style={styles.filterText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.compassButton} activeOpacity={0.7}>
            <Text style={styles.compassIcon}>⊕</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Continue to Watch */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Continue to Watch</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {continueWatching.map((item) => (
            <ContinueCard
              key={item.id}
              item={item}
              onPress={() => handleVideoPress(item)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Fables Collection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fables</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {fables.map((item) => (
            <ThumbnailCard
              key={item.id}
              item={item}
              onPress={() => handleVideoPress(item)}
            />
          ))}
        </ScrollView>
      </View>

  {/* Alamat Collection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alamat</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {alamat.map((item) => (
            <ThumbnailCard
              key={item.id}
              item={item}
              onPress={() => handleVideoPress(item)}
            />
          ))}
        </ScrollView>
      </View>

       {/* Classic Collection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filipino Classic</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {classics.map((item) => (
            <ThumbnailCard
              key={item.id}
              item={item}
              onPress={() => handleVideoPress(item)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Top Bar
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 12,
    gap: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1a1a1a',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  filterIcon: {
    fontSize: 14,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  compassButton: {
    marginLeft: 'auto',
    padding: 6,
  },
  compassIcon: {
    fontSize: 22,
    color: '#1a1a1a',
  },

  // Sections
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  // Regular thumbnail card
  card: {
    marginLeft: 16,
    width: THUMB_WIDTH,
  },
  thumbnail: {
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
    backgroundColor: '#D0E8D0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1a1a1a',
    lineHeight: 18,
  },

  // Continue to watch card
  continueCard: {
    marginLeft: 17,
    width: width * 0.7,
  },
  continueThumbnail: {
    width: width * 0.9,
    height: width * 0.7 * 0.55,
    backgroundColor: '#D0E8D0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  continueTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 4,
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },

  // Play button
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 3,
  },
});