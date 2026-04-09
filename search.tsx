import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const allVideos = [
  { id: '1', title: 'Ang Pagong at ang Matsing', collection: 'Fables' },
  { id: '2', title: 'Ang Aso at ang Uwak', collection: 'Fables' },
  { id: '3', title: 'Ang Langgam at ang Tipaklong', collection: 'Fables' },
  { id: '4', title: 'Ang Palaka at ang Baka', collection: 'Fables' },

  { id: '5', title: 'Alamat ng Sapatos', collection: 'Alamat' },
  { id: '6', title: 'Alamat ng Makahiya', collection: 'Alamat' },
  { id: '7', title: 'Alamat ng Mais', collection: 'Alamat' },
  { id: '8', title: 'Alamat ng Rosas', collection: 'Alamat' },

  { id: '9', title: 'Ibong Adarna', collection: 'Classics' },
  { id: '10', title: 'El Filibusterismo', collection: 'Classics' },
  { id: '11', title: 'Noli Me Tangere', collection: 'Classics' },
  { id: '12', title: 'Biag Ni Liam Ang', collection: 'Classics' },
];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const filtered = allVideos.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.collection.toLowerCase().includes(q)
    );
  });

  const handleVideoPress = (item: any) => {
    router.push({
      pathname: '/VideoPlayer',
      params: { title: item.title },
    });
  };

  return (
    <View style={styles.container}>

      {/* Search Bar */}
      <View style={styles.topBar}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Find a Story"
            placeholderTextColor="#999"
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Results count */}
        {query.length > 0 && (
          <Text style={styles.resultCount}>
            {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
          </Text>
        )}
      </View>

      {/* Empty State */}
      {query.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyTitle}>Search for a Story</Text>
          <Text style={styles.emptySubtitle}>
            Try searching by title or collection name
          </Text>
        </View>
      )}

      {/* No Results */}
      {query.length > 0 && filtered.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>😕</Text>
          <Text style={styles.emptyTitle}>No results found</Text>
          <Text style={styles.emptySubtitle}>
            Try a different title or collection name
          </Text>
        </View>
      )}

      {/* Results List */}
      {query.length > 0 && filtered.length > 0 && (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={styles.resultLabel}>
              Result for: <Text style={styles.resultQuery}>{query}</Text>
            </Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultCard}
              onPress={() => handleVideoPress(item)}
              activeOpacity={0.8}
            >
              {/* Thumbnail */}
              <View style={styles.resultThumbnail}>
                <View style={styles.playButton}>
                  <Text style={styles.playIcon}>▶</Text>
                </View>
              </View>

              {/* Info */}
              <View style={styles.resultInfo}>
                <Text style={styles.resultTitle}>{item.title}</Text>
                <View style={styles.collectionBadge}>
                  <Text style={styles.collectionText}>{item.collection}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Top bar
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 12,
    gap: 10,
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
  clearIcon: {
    fontSize: 14,
    color: '#999',
    paddingHorizontal: 4,
  },
  resultCount: {
    fontSize: 13,
    color: '#888',
    paddingHorizontal: 4,
  },

  // Empty state
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 10,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },

  // Results
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 16,
  },
  resultLabel: {
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 8,
    marginTop: 4,
  },
  resultQuery: {
    fontWeight: '700',
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  resultThumbnail: {
    width: width * 0.38,
    height: width * 0.38 * 0.62,
    backgroundColor: '#D0E8D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    color: '#FFFFFF',
    fontSize: 15,
    marginLeft: 3,
  },
  resultInfo: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 12,
    gap: 8,
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    lineHeight: 20,
  },
  collectionBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  collectionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2E7D32',
  },
});