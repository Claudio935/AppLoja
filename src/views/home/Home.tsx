import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Header from './Header';
import useFetch from '../../hooks/useFetch';
import { ProdutosType, PropsCart } from '../../types/types';
import SectionProduto from './Section';
import CustomInputText from '../../component/Input/CustomInputText';
import Card from './Card';


function Home(): JSX.Element {
  const [searchProduct, setSearchProduct] = useState("")
  const [arraySearchProduct, setArraySearchProduct] = useState<PropsCart[]>([])
  const [produtos, setProdutos] = useState<ProdutosType>({
    roupaHomem: [],
    roupaMulher: [],
    joias: [],
    eletronicos: [],
  });

  const { data, loading, error } = useFetch(typeof process.env.REACT_APP_URL === "string" ? process.env.REACT_APP_URL : null);

  const handleSeacrProduct = (text: string) => {

    const productFind = data.filter((item) => item.title.includes(text))
    setArraySearchProduct(productFind || [])

    setSearchProduct(text)


  }


  useEffect(() => {

    const roupaHomem = data.filter((item) => item.category === "men's clothing")
    const roupaMulher = data.filter((item) => item.category === "women's clothing")
    const joias = data.filter((item) => item.category === "jewelery",)
    const eletronicos = data.filter((item) => item.category === "electronics")
    setProdutos({
      roupaHomem,
      roupaMulher,
      joias,
      eletronicos,
    })
  }, [data]);


  if (loading) {
    return (
      <View style={[styles.containerLoading]}>

        <ActivityIndicator size="large" color="#0000ff" testID='loading' />

      </View>
    )
  }
  if (error) {
    return (<View style={[styles.containerLoading]}>

      <Text>Erro no banco de dados...</Text>

    </View>);
  };


  return (
    <>
      <Header></Header>
      <View style={styles.containerFlex}>
        <Image source={require('../../assets/image/loja.jpg')} testID='imagePrincipal' style={styles.imageStyle} ></Image>
        <CustomInputText value={searchProduct} onChange={(text) => { handleSeacrProduct(text) }} />
        {searchProduct.length === 0 ? <ScrollView style={styles.containerFlex}>

          <View >
            <Text style={styles.titleCategoria}>Moda Masculina</Text>
            <SectionProduto dados={produtos.roupaHomem} />
          </View>
          <View >
            <Text style={styles.titleCategoria}>Moda Feminina</Text>
            <SectionProduto dados={produtos.roupaMulher} />
          </View>
          <View >
            <Text style={styles.titleCategoria}>Eletronicos</Text>
            <SectionProduto dados={produtos.eletronicos} />
          </View>
          <View >
            <Text style={styles.titleCategoria}>Joias</Text>
            <SectionProduto dados={produtos.joias} />
          </View>
        </ScrollView> : <FlatList numColumns={2} data={arraySearchProduct} renderItem={({ item, index }) => (<Card key={index} productData={item} />)

        }></FlatList>}

      </View>


    </>
  );
};


const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
  },

  imageStyle: {
    width: '100%',
    height: '20%',
  },
  containerFlex: {
    flex: 1,
  },
  titleCategoria: {
    fontSize: 25,
    fontWeight: '900',
    color: '#000',
    marginVertical: 15,
    marginLeft: 5
  },

});

export default Home;
