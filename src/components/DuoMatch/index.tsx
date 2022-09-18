// dependencies
import { useState } from "react";
import { Modal, ModalProps, View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import { CheckCircle }   from 'phosphor-react-native';
import * as Clipboard    from 'expo-clipboard';


// components
import { Heading } from "../Heading";

// styles & images
import { THEME }  from "../../theme";
import { styles } from "./styles";

// interface & types
interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  // state
  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopping(true);
    await Clipboard.setStringAsync(discord)
    Alert.alert('Discord Copiado', 'Usuário copiado para você colar no Discord!')
    setIsCopping(false);
  }

  return (
    <Modal animationType="fade" transparent statusBarTranslucent {...rest}>
      <View style={styles.container} >
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500} />
          </TouchableOpacity>

          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

          <Heading title="Let´s Play!" subtitle="Agora é só jogar!" style={{ alignItems: 'center', marginTop: 24 }} />

          <Text style={styles.label}>
            Adiocione no Discord
          </Text>

          <TouchableOpacity 
            disabled={isCopping}
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipboard}
          >
            <Text style={styles.discord}>
              { isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}