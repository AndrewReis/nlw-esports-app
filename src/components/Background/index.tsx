// dependencies
import { ImageBackground } from 'react-native'

// styles & images
import { styles }    from './styles';
import backgroundImg from '../../assets/background-galaxy.png';

// interfaces & types
interface Props {
  children: React.ReactNode
}

export function Background({children}: Props) {
  return(
    <ImageBackground source={backgroundImg} defaultSource={backgroundImg} style={styles.container}>
      { children }
    </ImageBackground>
  );
}