// dependencies
import { useEffect, useState }                     from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Entypo }                        from '@expo/vector-icons';
import { SafeAreaView }                  from 'react-native-safe-area-context'
import { useRoute, useNavigation }       from '@react-navigation/native'

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

export function Game() {
  // state
  const [duos, setDuos] = useState<DuoCardProps[]>([]); 

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
          renderItem={ ({ item }) => (<DuoCard data={item} onConnect={() => {}} />) }
        />
        
      </SafeAreaView>
    </Background>
  )
}