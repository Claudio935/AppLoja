import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { type PropsCart } from '../../types/types';
import { type StackNavigation } from '../../../App';
import Card from './Card';

type dadosCarrinho = {
  dados: PropsCart[]
}


const SectionProduto: React.FC<dadosCarrinho> = ({ dados }: dadosCarrinho) => {
  const navigation = useNavigation<StackNavigation>();
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {dados.map((item, index) => {
        return (

          <TouchableOpacity style={styles.containerCard} onPress={() => { navigation.navigate('Produto', item); }} key={item.id} testID={`imageProdutoButton${index}`} >
            <Card productData={item} />
          </TouchableOpacity>

        );
      })
      }
    </ScrollView>
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

export default SectionProduto