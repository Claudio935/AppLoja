import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
} from 'react-native';
import { type StackNavigation } from '../../../App';
import Card from './Card';


function Cart(): JSX.Element {


  const navigation = useNavigation<StackNavigation>();


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <Text style={styles.titleCarrinho}>Itens do carrinho</Text>
          <Button testID="voltarHomeButton" title='Adicionar novos itens' color={'#1acd20'} onPress={() => { navigation.navigate('Home'); }}></Button>
        </View>
        <Card />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    marginBottom: 20
  },
  titleCarrinho: {
    textAlign: 'center',
    fontWeight: '900',
    color: '#000',
    fontSize: 30,
    marginBottom: 5
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    padding: 20
  },
  containerCarrinhoItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    height: 190,
  },
  containerCarrinhoText: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    width: '90%',
    height: '70%'
  },
  containerCarrinhoTextButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '60%',
    height: '100%'
  },
  viewDecrementIncremment: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingVertical: 15,
    width: 100
  },
  buttonIncrement: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    backgroundColor: '#1acd20',
    borderRadius: 100,
    padding: 7,
  },
  buttonDecrement: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    backgroundColor: '#fe0f0f',
    borderRadius: 100,
    padding: 7,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    backgroundColor: '#fe0f0f',
    borderRadius: 15,
    padding: 7,
  },
  textButton: {
    color: '#fff',
    fontWeight: '900'
  },
  titleProduto: {
    fontSize: 16,
    color: '#000',
    fontWeight: '900'
  },
  quantidade: {
    fontSize: 14,
    color: '#000',
    fontWeight: '700',
    paddingVertical: 15
  },
  price: {
    fontSize: 14,
    color: '#b71919',
    fontWeight: '900',
    padding: 5
  }
});


export default Cart;