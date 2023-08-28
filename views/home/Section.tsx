import React from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  PropsCarrinho } from '../../types/interfaces';
import { StackNavigation } from '../../App';



const SectionProduto = ({ dados }: { dados: PropsCarrinho[] }) => {
    const navigation = useNavigation<StackNavigation>()
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {dados.map((item) => {
          return (

            <TouchableOpacity style={styles.containerCard} onPress={() => navigation.navigate('Produto', item)} key={item.id} testID={`imageProdutoButton${item.id}`} >
              <Image source={{
                uri: item.image,
              }} style={styles.produtoImage} testID={`imageProdudo${item.id}`}></Image>
              <View style={styles.containerTextCard}>
                <Text style={styles.produtoTextTitle}>{item.title}</Text>
                <Text style={styles.produtoTextPreco}>{`R$ ${item.price}`}</Text>
              </View>
            </TouchableOpacity>

          )
        })
        }
      </ScrollView>
    )
  }

  const styles = StyleSheet.create({
   
    containerCard: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: 200,
      height: 280,
      flexDirection: 'column',
      background: '#c52222',
      borderRadius: 15,
      border: '1px solid #000',
      padding: 2,
      marginHorizontal: 10
    },
   
    produtoImage: {
      width: '70%',
      height: "60%",
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