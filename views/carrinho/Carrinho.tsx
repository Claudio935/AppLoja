import { RouteProp, useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Button
} from 'react-native';
import { CarrinhoContext } from '../../contexts/carrinhoProvider/context';
import { RootStackParamList, StackNavigation } from '../../App';
import { PropsCarrinho } from '../../contexts/carrinhoProvider/interfaces';
import { deteleProduto } from '../../contexts/carrinhoProvider/actions';




type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Carrinho'>;

function Carrinho(): JSX.Element {

  const { carrinho, dispatch } = useContext(CarrinhoContext)

  const navigation = useNavigation<StackNavigation>()

  const handleDelete = (objectProduto: PropsCarrinho) => {
    if (!objectProduto.id) {
      return
    }
    if (!!dispatch) {
      deteleProduto(dispatch, objectProduto)
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <Text style={styles.titleCarrinho}>Itens do carrinho</Text>
          <Button title='Adicionar novos itens' color={'#1acd20'} onPress={() => navigation.navigate('Home')}></Button>
        </View>
        {carrinho.map((item) => {
          return (
            <View style={styles.containerCarrinhoItem}>
              <Image source={{ uri: item.image }} style={{ width: '40%', height: '100%' }} />
              <View style={styles.containerCarrinhoTextButton}>
                <View style={styles.containerCarrinhoText}>
                  <Text style={styles.titleProduto}>{item.title}</Text>
                  <Text style={styles.quantidade}>Quantidade: {item.quantidade}</Text>
                  <Text style={styles.price}> R$ {item.price}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => handleDelete(item)}>
                  <Text style={styles.textButton}>Retirar do Carrinho</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  );
}

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

  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    backgroundColor: 'red',
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
    fontWeight: '700'
  },
  price: {
    fontSize: 14,
    color: '#b71919',
    fontWeight: '900'
  }
});


export default Carrinho;