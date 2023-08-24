import React from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Header from '../../components/header/Header';
import { useFetch } from '../../hooks/useFetch';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../App';



function Home(): JSX.Element {


  const navigation = useNavigation<StackNavigation>()
  const { data, loading, error } = useFetch('https://fakestoreapi.com/products')
  

  return (
    <>
      <Header></Header>

      {!loading &&
        <View>
          <Image source={require('../../assets/loja.jpg')} style={styles.imageStyle} ></Image>
          <FlatList data={data}
            numColumns={3}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={styles.containerCard} onPress={() => navigation.navigate('Produto',item)} >
                  <Image source={{
                    uri: item.image,
                  }} style={styles.produtoImage}></Image>
                  <View style={styles.containerTextCard}>
                    <Text style={styles.produtoTextTitle}>{item.title}</Text>
                    <Text style={styles.produtoTextPreco}>{`R$ ${item.price}`}</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      }

    </>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: '100%',
    height: '20%',

  },
  containerCard: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 150,
    flexDirection: 'column',
    margin: 15,
    background: '#c52222',
    borderRadius: 15,
    border: '1px solid #000',
    padding: 2
  },

  produtoImage: {
    width: '100%',
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
    fontSize: 9,
    fontWeight: '800',
  },
  produtoTextPreco: {
    fontSize: 9,
    fontWeight: '800',
    color: '#ed0e0e'
  }
});

export default Home;
