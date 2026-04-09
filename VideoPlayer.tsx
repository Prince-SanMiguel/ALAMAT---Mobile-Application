import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { getFavorites, addFavorite, removeFavorite } from './utils/favorites';
import { useEffect } from 'react';

const { width } = Dimensions.get('window');

const videoDescriptions: Record<string, { tagalog: string; english: string; favorite: boolean }> = {
  'Ang Pagong at Ang Matsing': {
    tagalog: 'Si Pagong at Matsing ay dalawang magkaibigan na nagtanim ng saging. Nang lumaki na ang puno, pinili ni Matsing ang tuktok habang si Pagong ay ang puno. Nalaman ni Pagong na mas mainam ang kanyang pinili dahil doon lumabas ang mga bunga. Natuto si Matsing na ang katamaran at katusuhan ay hindi nagbubunga ng mabuti.',
    english: 'The Turtle and the Monkey were two friends who planted a banana tree together. When the tree grew, Monkey chose the top part while Turtle chose the trunk. Turtle discovered his choice was better because that is where the fruit grew. Monkey learned that laziness and trickery do not lead to good results.',
    favorite: false,
  },
  'Ang Aso at ang Uwak': {
    tagalog: 'Ang alamat ng Makahiya ay kwento ng isang dalagang mahiyain na nagngangalang Maria. Siya ay palaging nagtatago kapag may mga bisita sa kanilang bahay. Isang araw, namatay siya ng walang dahilan at sa kanyang libing ay tumubo ang isang halaman. Ang halamang ito ay nagtatago rin ang mga dahon kapag hinawakan, tulad ni Maria.',
    english: 'The legend of Makahiya tells the story of a shy girl named Maria. She would always hide whenever visitors came to their home. One day she passed away without any apparent cause and a plant grew on her grave. This plant also hides its leaves when touched just like Maria used to do.',
    favorite: false,
  },
  'Ang Langgam at ang Tipaklong': {
    tagalog: 'Si Pagong at Matsing ay dalawang magkaibigan na nagtanim ng saging. Nang lumaki na ang puno, pinili ni Matsing ang tuktok habang si Pagong ay ang puno. Nalaman ni Pagong na mas mainam ang kanyang pinili dahil doon lumabas ang mga bunga. Natuto si Matsing na ang katamaran at katusuhan ay hindi nagbubunga ng mabuti.',
    english: 'The Turtle and the Monkey were two friends who planted a banana tree together. When the tree grew, Monkey chose the top part while Turtle chose the trunk. Turtle discovered his choice was better because that is where the fruit grew. Monkey learned that laziness and trickery do not lead to good results.',
    favorite: false,
  },
  'Ang Palaka at ang Baka': {
    tagalog: 'Ang alamat ng rosas ay nagsimula sa isang magandang diwata na nagngangalang Rosa. Siya ay nagmahal sa isang mortal na lalaki ngunit hindi ito maaaring maging totoo. Dahil sa kanyang pag-ibig, siya ay naging isang magandang bulaklak na may tinik. Ang mga tinik ay simbolo ng sakit ng puso na kanyang naranasan.',
    english: 'The legend of the rose began with a beautiful fairy named Rosa. She fell in love with a mortal man but their love could never be. Because of her love she was transformed into a beautiful flower with thorns. The thorns symbolize the heartache and pain that she experienced.',
    favorite: false,
  },
  'Ang Alamat ng Pinya': {
    tagalog: 'Ang alamat ng pinya ay tungkol sa isang batang babaing tamad na nagngangalang Pina. Palagi siyang humihingi ng tulong sa kanyang ina para sa pinakamaliit na bagay. Isang araw, nagkasakit ang kanyang ina at hinanap niya ang kanyang mangkok ngunit wala. Nang mamatay ang kanyang ina, tumubo ang halaman mula sa lupa na may libu-libong mata.',
    english: 'The legend of the pineapple is about a lazy little girl named Pina. She always asked her mother for help with the smallest of tasks. One day her mother fell ill and asked Pina to find her bowl but it was nowhere to be found. When her mother passed away a plant grew from the ground with thousands of eyes.',
    favorite: false,
  },
  'Ang Alamat ng Sapatos': {
    tagalog: 'Ang alamat ng Makahiya ay kwento ng isang dalagang mahiyain na nagngangalang Maria. Siya ay palaging nagtatago kapag may mga bisita sa kanilang bahay. Isang araw, namatay siya ng walang dahilan at sa kanyang libing ay tumubo ang isang halaman. Ang halamang ito ay nagtatago rin ang mga dahon kapag hinawakan, tulad ni Maria.',
    english: 'The legend of Makahiya tells the story of a shy girl named Maria. She would always hide whenever visitors came to their home. One day she passed away without any apparent cause and a plant grew on her grave. This plant also hides its leaves when touched just like Maria used to do.',
    favorite: false,
  },
  'Ang Alamat ng Makahiya': {
    tagalog: 'Ang alamat ng pinya ay tungkol sa isang batang babaing tamad na nagngangalang Pina. Palagi siyang humihingi ng tulong sa kanyang ina para sa pinakamaliit na bagay. Isang araw, nagkasakit ang kanyang ina at hinanap niya ang kanyang mangkok ngunit wala. Nang mamatay ang kanyang ina, tumubo ang halaman mula sa lupa na may libu-libong mata.',
    english: 'The legend of the pineapple is about a lazy little girl named Pina. She always asked her mother for help with the smallest of tasks. One day her mother fell ill and asked Pina to find her bowl but it was nowhere to be found. When her mother passed away a plant grew from the ground with thousands of eyes.',
    favorite: false,
  },
  'Ang Alamat ng Rosas': {
    tagalog: 'Ang alamat ng Makahiya ay kwento ng isang dalagang mahiyain na nagngangalang Maria. Siya ay palaging nagtatago kapag may mga bisita sa kanilang bahay. Isang araw, namatay siya ng walang dahilan at sa kanyang libing ay tumubo ang isang halaman. Ang halamang ito ay nagtatago rin ang mga dahon kapag hinawakan, tulad ni Maria.',
    english: 'The legend of Makahiya tells the story of a shy girl named Maria. She would always hide whenever visitors came to their home. One day she passed away without any apparent cause and a plant grew on her grave. This plant also hides its leaves when touched just like Maria used to do.',
    favorite: false,
  },
  'Ibong Adarna': {
    tagalog: 'Ang alamat ng pinya ay tungkol sa isang batang babaing tamad na nagngangalang Pina. Palagi siyang humihingi ng tulong sa kanyang ina para sa pinakamaliit na bagay. Isang araw, nagkasakit ang kanyang ina at hinanap niya ang kanyang mangkok ngunit wala. Nang mamatay ang kanyang ina, tumubo ang halaman mula sa lupa na may libu-libong mata.',
    english: 'The legend of the pineapple is about a lazy little girl named Pina. She always asked her mother for help with the smallest of tasks. One day her mother fell ill and asked Pina to find her bowl but it was nowhere to be found. When her mother passed away a plant grew from the ground with thousands of eyes.',
    favorite: false,
  },
  'El Filibusterismo': {
    tagalog: 'Ang alamat ng Makahiya ay kwento ng isang dalagang mahiyain na nagngangalang Maria. Siya ay palaging nagtatago kapag may mga bisita sa kanilang bahay. Isang araw, namatay siya ng walang dahilan at sa kanyang libing ay tumubo ang isang halaman. Ang halamang ito ay nagtatago rin ang mga dahon kapag hinawakan, tulad ni Maria.',
    english: 'The legend of Makahiya tells the story of a shy girl named Maria. She would always hide whenever visitors came to their home. One day she passed away without any apparent cause and a plant grew on her grave. This plant also hides its leaves when touched just like Maria used to do.',
    favorite: false,
  },
  'Noli Me Tangere': {
    tagalog: 'Ang alamat ng Makahiya ay kwento ng isang dalagang mahiyain na nagngangalang Maria. Siya ay palaging nagtatago kapag may mga bisita sa kanilang bahay. Isang araw, namatay siya ng walang dahilan at sa kanyang libing ay tumubo ang isang halaman. Ang halamang ito ay nagtatago rin ang mga dahon kapag hinawakan, tulad ni Maria.',
    english: 'The legend of Makahiya tells the story of a shy girl named Maria. She would always hide whenever visitors came to their home. One day she passed away without any apparent cause and a plant grew on her grave. This plant also hides its leaves when touched just like Maria used to do.',
    favorite: false,
  },
  'Biag Ni Liam Ang': {
    tagalog: 'Ang alamat ni ang alamat ng Makahiya ay kwento ng isang dalagang mahiyain na nagngangalang Maria. Siya ay palaging nagtatago kapag may mga bisita sa kanilang bahay. Isang araw, namatay siya ng walang dahilan at sa kanyang libing ay tumubo ang isang halaman. Ang halamang ito ay nagtatago rin ang mga dahon kapag hinawakan, tulad ni Maria.',
    english: 'The legend of Makahiya tells the story of a shy girl named Maria. She would always hide whenever visitors came to their home. One day she passed away without any apparent cause and a plant grew on her grave. This plant also hides its leaves when touched just like Maria used to do.',
    favorite: false,
  },
};

const defaultDescription = {
  tagalog: 'Ito ay isa sa mga kilalang alamat ng Pilipinas na puno ng aral at karunungan. Ang kwentong ito ay nagmula sa sinaunang panahon ng ating mga ninuno. Ipinapakita nito ang mga halaga at kultura ng mga Pilipino sa pamamagitan ng isang nakaka-engganyong kwento. Makinig at matuto mula sa mga tauhan at karanasan sa kwentong ito.',
  english: 'This is one of the well-known legends of the Philippines full of lessons and wisdom. This story originated from the ancient times of our ancestors. It showcases Filipino values and culture through an engaging and meaningful narrative. Listen and learn from the characters and experiences in this story.',
  favorite: false,
};

export default function VideoPlayerScreen() {
  const { title } = useLocalSearchParams();
  const router = useRouter();
  const [language, setLanguage] = useState<'tagalog' | 'english'>('tagalog');
  const [isFavorite, setIsFavorite] = useState(false);



  const videoTitle = Array.isArray(title) ? title[0] : title ?? '';
  const data = videoDescriptions[videoTitle] ?? defaultDescription;
  const description = language === 'tagalog' ? data.tagalog : data.english;


 useEffect(() => {
  const checkFavorite = async () => {
    const favs = await getFavorites();
    setIsFavorite(favs.includes(videoTitle));
  };
  checkFavorite();
}, [videoTitle]);


  const handleFavorite = async () => {
  if (isFavorite) {
    await removeFavorite(videoTitle);
    setIsFavorite(false);
  } else {
    await addFavorite(videoTitle);
    setIsFavorite(true);
  }
};



  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Video Player */}
      <View style={styles.player}>
        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.playIcon}>▶</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>

        {/* Title */}
        <Text style={styles.title}>{videoTitle}</Text>

        {/* Language Toggle */}
        <View style={styles.languageRow}>
          <TouchableOpacity
            style={[styles.langButton, language === 'tagalog' && styles.langButtonActive]}
            onPress={() => setLanguage('tagalog')}
            activeOpacity={0.8}
          >
            <Text style={[styles.langText, language === 'tagalog' && styles.langTextActive]}>
              Tagalog
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.langButton, language === 'english' && styles.langButtonActive]}
            onPress={() => setLanguage('english')}
            activeOpacity={0.8}
          >
            <Text style={[styles.langText, language === 'english' && styles.langTextActive]}>
              English
            </Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text style={styles.description}>{description}</Text>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
            onPress={handleFavorite}
            activeOpacity={0.8}
          >
            <Text style={styles.favoriteIcon}>{isFavorite ? '♥' : '♡'}</Text>
            <Text style={[styles.favoriteText, isFavorite && styles.favoriteTextActive]}>
              {isFavorite ? 'Favorited' : 'Favorite'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.backText}>← Go Back</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Player
  player: {
    width: width,
    height: width * 0.56,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  playIcon: {
    fontSize: 28,
    color: '#FFFFFF',
    marginLeft: 4,
  },

  // Content
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 48,
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
  },

  // Language Toggle
  languageRow: {
    flexDirection: 'row',
    gap: 10,
  },
  langButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#D0D0D0',
    backgroundColor: '#FFFFFF',
  },
  langButtonActive: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },
  langText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888',
  },
  langTextActive: {
    color: '#FFFFFF',
  },

  // Description
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
  },

  // Action Buttons
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  favoriteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#D0D0D0',
    backgroundColor: '#FFFFFF',
  },
  favoriteButtonActive: {
    backgroundColor: '#FFF0F0',
    borderColor: '#E53935',
  },
  favoriteIcon: {
    fontSize: 18,
    color: '#E53935',
  },
  favoriteText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#888',
  },
  favoriteTextActive: {
    color: '#E53935',
  },
  backButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#1a1a1a',
    backgroundColor: '#FFFFFF',
  },
  backText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1a1a1a',
  },
});