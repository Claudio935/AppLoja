import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


function Header(): JSX.Element {


  return (
    <View style={styles.HeaderContainer}>
      <View style={styles.ContainerTextLojaNome}>
        <Text style={styles.TitleLoja}>Mundo das vendas</Text>
        <Text style={styles.SubtitleLoja}>Seu Aplicativo de vendas!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderContainer: {
    justifyContent: 'space-between',
    backgroundColor: '#000'
  },
  ContainerTextLojaNome: {
    padding: 8,
  },
  TitleLoja: {
    color: '#ffff',
    fontSize: 12,
    fontWeight: '900',
  },
  SubtitleLoja: {
    color: '#ecec13',
    fontSize: 10,
    fontWeight: '900',
  }

});

export default Header;
