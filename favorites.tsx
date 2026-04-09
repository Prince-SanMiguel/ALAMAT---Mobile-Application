import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useState, useCallback } from 'react';
import { getFavorites } from '../utils/favorites';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;
const CARD_HEIGHT = CARD_WIDTH * 0.65;

export default function FavoritesScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  const handleVideoPress = (title: string) => {
    router.push({
      pathname: '/VideoPlayer',
      params: { title },
    });
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerIcon}>♡</Text>
        <Text style={styles.headerTitle}>Favorites</Text>
      </View>

      {/* Empty State */}
      {favorites.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>♡</Text>
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap the Favorite button on any video to save it here
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => router.push('/home')}
            activeOpacity={0.8}
          >
            <Text style={styles.browseText}>Browse Stories</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Favorites List — vertical, one per row */}
      {favorites.length > 0 && (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleVideoPress(item)}
              activeOpacity={0.8}
            >
              {/* Thumbnail */}
              <View style={styles.thumbnail}>
                <View style={styles.playButton}>
                  <Text style={styles.playIcon}>▶</Text>
                </View>
                {/* Favorite badge */}
                <View style={styles.favBadge}>
                  <Text style={styles.favBadgeIcon}>♥</Text>
                </View>
              </View>

              {/* Title centered below thumbnail */}
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item}
              </Text>
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

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 16,
  },
  headerIcon: {
    fontSize: 22,
    color: '#E53935',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1a1a1a',
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
    fontSize: 56,
    color: '#E0E0E0',
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
  browseButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderWidth: 1.5,
    borderColor: '#1a1a1a',
    borderRadius: 8,
  },
  browseText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1a1a1a',
  },

    listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 20,
  },
  row: {
    gap: 16,
    marginBottom: 20,
  },
  card: {
    width: '100%',
    alignItems: 'center',
  },
  thumbnail: {
    width: 355,
    height: 200,
    backgroundColor: '#D0E8D0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
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
  favBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favBadgeIcon: {
    fontSize: 13,
    color: '#E53935',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    width: '100%',
  },
});