import React from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { type PropsCart } from '../../types/types';
import { type StackNavigation } from '../../../App';

import { transformMoney } from '../../utils/transformFunctions';

type ProductDataType = {
  productData: PropsCart
}

const Card: React.FC<ProductDataType> = ({ productData }) => {
  const navigation = useNavigation<StackNavigation>();
  return (


    <TouchableOpacity style={styles.containerCard} onPress={() => { navigation.navigate('Produto', productData); }} key={productData.id} testID={`imageProdutoButton${productData.id}`} >
      <Image source={{
        uri: productData.image,
      }} style={styles.produtoImage} testID={`imageProdudo${productData.id}`}></Image>
      <View style={styles.containerTextCard}>
        <Text style={styles.produtoTextTitle}>{productData.title}</Text>
        <Text style={styles.produtoTextPreco}>{transformMoney(productData.price)}</Text>
      </View>
    </TouchableOpacity>


  );
};

const styles = StyleSheet.create({

  containerCard: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 210,
    height: 290,
    flexDirection: 'column',
    background: '#c52222',
    borderRadius: 15,
    border: '1px solid #000',
    padding: 2,
    marginHorizontal: 10,

  },

  produtoImage: {
    width: 140,
    height: 120,
    borderRadius: 15
  },
  containerTextCard: {
    height: "40%",
    width: '100%',
    alignItems: 'center',
    display: 'flex',

  },
  produtoTextTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000'
  },
  produtoTextPreco: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ed0e0e'
  }
});

export default Card