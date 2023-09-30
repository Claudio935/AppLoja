import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { StackNavigation } from '../../../App';


function Header(): JSX.Element {

  const navigation = useNavigation<StackNavigation>();

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const icone = require("../../assets/icons/carrinhoIcone.png");
  return (
    <View style={styles.HeaderContainer}>
      <View style={styles.ContainerTextLojaNome}>
        <Text style={styles.TitleLoja}>Mundo das vendas</Text>
        <Text style={styles.SubtitleLoja}>Seu Aplicativo de vendas!</Text>
      </View>
      <TouchableOpacity onPress={() => { navigation.navigate('Cart'); }} style={styles.carrinhoIcon} testID='iconTouch'>
        <Image source={icone} style={styles.imageIcon} testID='headerIconImage'></Image>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    flexDirection: 'row'
  },
  ContainerTextLojaNome: {
    padding: 8,
  },
  TitleLoja: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: '900',
  },
  SubtitleLoja: {
    color: '#ecec13',
    fontSize: 13,
    fontWeight: '900',
  },
  carrinhoIcon: {
    backgroundColor: '#fff',
    borderRadius: 23,
    height: 40,
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 2,
    borderStyle: 'solid'
  },
  imageIcon: {
    height: 20,
    width: 20
  }

});

export default Header;
