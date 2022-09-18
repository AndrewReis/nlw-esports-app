// dependencies
import { useState, useEffect } from 'react';
import { Image, FlatList }     from "react-native";
import { SafeAreaView }        from 'react-native-safe-area-context'
import { useNavigation }       from '@react-navigation/native'

// components
import { Heading }                 from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Background }              from '../../components/Background';

// styles & images
import { styles } from './styles';
import logoImg    from '../../assets/logo-nlw-esports.png';

export function Home() {
  // state
  const [games, setGames] = useState<GameCardProps[]>([]);

  // variables
  const navigation = useNavigation();

  // request
  useEffect(() => {
    fetch('http://192.168.0.22:3333/games')
      .then(res => res.json())
      .then(data => setGames(data))
  }, []);

  // functions
  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', {
      id,
      title,
      bannerUrl
    })
  }

  // Code
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading title='Encontre seu duo' subtitle='Selecione o game que deseja jogar...' />
        <FlatList
          data={games}
          keyExtractor={item => item.id}
          horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
          renderItem={({ item }) => (<GameCard data={item} onPress={() => handleOpenGame(item)} />)}
        />
      </SafeAreaView>
    </Background>
  );
}