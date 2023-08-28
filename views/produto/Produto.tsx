import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useContext, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Alert
} from 'react-native';
import { CarrinhoContext } from '../../contexts/carrinhoProvider/context';
import { addProduto } from '../../contexts/carrinhoProvider/actions';

import { PropsCarrinho, RootStackParamList } from '../../types/interfaces';
import { StackNavigation } from '../../App';




type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Produto'>;

function Produto(): JSX.Element {

  const { params } = useRoute<ProfileScreenRouteProp>();

  const navigation = useNavigation<StackNavigation>()
  const { carrinho, dispatch } = useContext(CarrinhoContext)

  const [quantidadeProduto, setQuantidadeProduto] = useState(0)
  const [objectCarrinho, setObjectCarrinho] = useState<PropsCarrinho>({
    title: "",
    image: "",
    quantidade: `${quantidadeProduto}`,
    price: 0,
    id: ''
  })

  useEffect(() => {
    if (!!params) {
      setObjectCarrinho({
        title: params.title,
        image: params.image,
        quantidade: `${quantidadeProduto}`,
        price: typeof params.price === 'number' ? params.price * quantidadeProduto : 0,
        id: params.id
      })
    }

  }, [params, quantidadeProduto])


  const handleAddCarrinho = (item: PropsCarrinho) => {
    if (quantidadeProduto === 0) {
      Alert.alert(
        "Alerta",
        "Adicione uma quantidade de produto",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },

        ]
      );
      return
    }

    if (carrinho.filter((objeto) => objeto.title === params?.title).length > 0) {
      Alert.alert(
        "Alerta",
        "Produto já adicionado?",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },

        ]
      );
      return
    }
    if (!!dispatch) {
      addProduto(dispatch, {
        title: item.title,
        image: item.image,
        quantidade: `${quantidadeProduto}`,
        price: item.price,
        id: item.id,
      })
    }
    navigation.navigate('Carrinho')
  }



  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.produtoContainer}>
          <Image source={{ uri: params?.image }} style={styles.produtoImage} testID='imageProduto'></Image>
          <Text style={styles.titleProduto}>{params?.title}</Text>
          <Text style={styles.description}>{params?.description}</Text>
          <Text style={styles.price}>{`R$ ${!params?.price ? 0 : params.price * quantidadeProduto}`}</Text>
          <View style={styles.buttonContainer}>
            <Button title='<' onPress={() => setQuantidadeProduto((value) => value === 0 ? value : value - 1)} testID='decrement'></Button>
            <Text style={styles.textButton} testID='textQuantidade'>{quantidadeProduto}</Text>
            <Button title='>' onPress={() => setQuantidadeProduto((value) => value + 1)} testID='increment'></Button>
          </View>
          <Button title='Adicionar ao Carrinho' onPress={() => handleAddCarrinho(objectCarrinho)} testID='carrinhoButton'></Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

  },
  produtoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 10,
    height: 500,
    width: '100%'
  },
  produtoImage: {
    width: 180,
    height: 220,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'
  },
  textButton: {
    marginHorizontal: 15,
    fontWeight: '900'
  },

  titleProduto: {
    fontSize: 15,
    fontWeight: '900',
    color: '#000'
  },
  description: {
    textAlign: 'justify',
    paddingHorizontal: 5
  },
  price: {
    fontSize: 14,
    color: '#b71919',
    fontWeight: '900'
  }

});


export default Produto;

