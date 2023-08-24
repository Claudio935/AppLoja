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
import { loadMovies } from '../../contexts/carrinhoProvider/actions';

import { PropsCarrinho } from '../../contexts/carrinhoProvider/interfaces';
import { RootStackParamList, StackNavigation } from '../../App';




type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Produto'>;

function Produto(): JSX.Element {

  const { params } = useRoute<ProfileScreenRouteProp>();

  const navigation = useNavigation<StackNavigation>()

  const [quantidadeProduto, setQuantidadeProduto] = useState(0)
  const [objectCarrinho, setObjectCarrinho] = useState({
    title: "",
    image: "",
    quantidade: `${quantidadeProduto}`,
    price: ''
  })

  useEffect(() => {
    if (!!params) {
      setObjectCarrinho({
        title: params.title,
        image: params.image,
        quantidade: `${quantidadeProduto}`,
        price: params.price
      })
    }
  }, [params, quantidadeProduto])
  const { carrinho, dispatch } = useContext(CarrinhoContext)


 


  const handleAddCarrinho = (item: PropsCarrinho) => {
    if(carrinho.filter((objeto)=> objeto.title === params?.title).length>0){
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
      loadMovies(dispatch, {
        title: item.title,
        image: item.image,
        quantidade: `${quantidadeProduto}`,
        price: item.price,
      })
    }
     navigation.navigate('Carrinho')
  }


  return (
    <ScrollView>
    <View style={styles.Container}>
      <View style={styles.ProdutoContainer}>
        <Image source={{ uri: params?.image }} style={styles.ProdutoImage}></Image>
        <Text style={styles.TitleProduto}>{params?.title}</Text>
        <Text>{params?.description}</Text>
        <View style={styles.ButtonContainer}>
          <Button title='<' onPress={() => setQuantidadeProduto((value) => value - 1)}></Button>
          <Text>{quantidadeProduto}</Text>
          <Button title='>' onPress={() => setQuantidadeProduto((value) => value + 1)}></Button>
        </View>
        <Button title='Adicionar ao Carrinho' onPress={() => handleAddCarrinho(objectCarrinho)}></Button>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    
  },
  ProdutoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 10,
    height: 500,
  },
  ProdutoImage: {
    width: 180,
    height: 220,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  ButtonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: '30%'
  },

TitleProduto:{
  fontSize: 15,
  fontWeight:'900',
  color:'#000'
},


  ContainerCarrinhoItem:{
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width:'100%',
    overflow:'scroll',
    flexDirection:'row'
  },
  ContainerCarrinhoText:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column'
  }
});


export default Produto;

