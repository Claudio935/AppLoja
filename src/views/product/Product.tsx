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
import { CartContext } from '../../contexts/cartProvider/context';
import { addProduto } from '../../contexts/cartProvider/actions';
import { PropsCart, RootStackParamList } from '../../types/types';
import { StackNavigation } from '../../../App';
import { transformMoney } from '../../utils/transformFunctions';


type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Produto'>;

function Product(): JSX.Element {

  const { params } = useRoute<ProfileScreenRouteProp>();

  const navigation = useNavigation<StackNavigation>();
  const { store, dispatch } = useContext(CartContext);

  const [quantidadeProduto, setQuantidadeProduto] = useState(0);
  const [objectCarrinho, setObjectCarrinho] = useState<PropsCart>({
    title: "",
    image: "",
    quantidade: quantidadeProduto,
    price: 0,
    id: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    if (params) {
      setObjectCarrinho({
        title: params.title,
        image: params.image,
        quantidade: quantidadeProduto,
        price: params.price,
        id: params.id,
        description: params.description,
        category: params.description
      })
    }

  }, [params, quantidadeProduto]);


  const handleAddCarrinho = (item: PropsCart) => {
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
    };

    if (store.cart.filter((objeto) => objeto.id === params?.id).length > 0) {
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

    addProduto(dispatch, {
      title: item.title,
      image: item.image,
      quantidade: quantidadeProduto,
      price: item.price,
      id: item.id,
      description: item.description,
      category: item.category
    })

    navigation.navigate('Cart')
  };


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.produtoContainer}>
          <Image source={{ uri: params?.image }} style={styles.produtoImage} testID='imageProduto'></Image>
          <Text style={styles.titleProduto}>{params?.title}</Text>
          <Text style={styles.description}>{params?.description}</Text>
          <Text style={styles.price}>{transformMoney(!params?.price ? 0 : params.price * quantidadeProduto)}</Text>
          <View style={styles.quantifyContainer}>
            <Button title='<' onPress={() => { setQuantidadeProduto((value) => value === 0 ? value : value - 1); }} testID='decrement'></Button>
            <Text style={styles.textButton} testID='textQuantidade'>{quantidadeProduto}</Text>
            <Button title='>' onPress={() => { setQuantidadeProduto((value) => value + 1); }} testID='increment'></Button>
          </View>
          <Button title='Adicionar ao Carrinho' onPress={() => { handleAddCarrinho(objectCarrinho); }} testID='carrinhoButton'></Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    marginBottom: 15,
  },
  produtoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    marginVertical: 15,
    width: '100%',

  },
  produtoImage: {
    width: 180,
    height: 220,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  quantifyContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15,
  },
  textButton: {
    marginHorizontal: 15,
    fontWeight: '900'
  },

  titleProduto: {
    fontSize: 15,
    fontWeight: '900',
    color: '#000',
    width: 300,
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    textAlign: 'justify',
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  price: {
    fontSize: 14,
    color: '#b71919',
    fontWeight: '900',
    marginBottom: 15,
  }

});


export default Product;

