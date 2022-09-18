// dependencies
import { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native'
import { Entypo }                  from '@expo/vector-icons';
import { SafeAreaView }            from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'

// components
import { Background } from '../../components/Background'
import { Heading }    from '../../components/Heading';

// styles & images
import { THEME }  from '../../theme';
import { styles } from './styles'
import logoImg    from '../../assets/logo-nlw-esports.png';

// interface & types
import { GameParams }            from '../../@types/navigation'
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch }              from '../../components/DuoMatch';

export function Game() {
  // state
  const [duos, setDuos]                           = useState<DuoCardProps[]>([]);
  const [discordSelected, setDiscordSelected] = useState('');

  // variables
  const route      = useRoute();
  const navigation = useNavigation();
  const game       = route.params as GameParams;

  // request
  useEffect(() => {
    fetch(`http://192.168.0.22:3333/games/${game.id}/ads`)
      .then(res => res.json())
      .then(data => setDuos(data))
  }, []);
  
  // functions
  function handleGoBack() {
    navigation.goBack();
  }

  async function getUserDiscord(adsId: string) {
    try {
      fetch(`http://192.168.0.22:3333/ads/${adsId}/discord`)
        .then(res => res.json())
        .then(data => setDiscordSelected(data.discord))
    } catch (error) {
      
    }
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} size={30} />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>
        <Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode='cover' />
        <Heading title={game.title} subtitle='Conecte-se e comece a jogar!' />

        <FlatList 
          data={duos}
          keyExtractor={item => item.id}
          horizontal
          style={styles.containerList}
          contentContainerStyle={styles.contentList}
          showsHorizontalScrollIndicator={false}
          renderItem={ ({ item }) => (<DuoCard data={item} onConnect={() => getUserDiscord(item.id)} />) }
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados para esse jogo.
            </Text>
          )}
        />
        <DuoMatch discord={discordSelected} visible={discordSelected.length !== 0} onClose={() => setDiscordSelected('')} />       
      </SafeAreaView>
    </Background>
  )
}