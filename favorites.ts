import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

export async function getFavorites(): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function addFavorite(title: string): Promise<void> {
  try {
    const current = await getFavorites();
    if (!current.includes(title)) {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify([...current, title]));
    }
  } catch {}
}

export async function removeFavorite(title: string): Promise<void> {
  try {
    const current = await getFavorites();
    const updated = current.filter((t) => t !== title);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  } catch {}
}

export async function isFavorited(title: string): Promise<boolean> {
  const current = await getFavorites();
  return current.includes(title);
}