import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Header from './Header';
import  useFetch  from '../../hooks/useFetch';
import { ProdutosType} from '../../types/interfaces';
import SectionProduto from './Section';




function Home(): JSX.Element {

  const [produtos, setProdutos] = useState<ProdutosType>({
    roupaHomem: [],
    roupaMulher: [],
    joias: [],
    eletronicos: [],
  });
 
  const { data, loading, error } = useFetch('https://fakestoreapi.com/products');

  useEffect(() => {

    const roupaHomem = data.filter((item) => item.category === "men's clothing")
    const roupaMulher = data.filter((item) => item.category === "women's clothing")
    const joias = data.filter((item) => item.category === "jewelery",)
    const eletronicos = data.filter((item) => item.category === "electronics")
    setProdutos({
      roupaHomem: roupaHomem,
      roupaMulher: roupaMulher,
      joias: joias,
      eletronicos: eletronicos,
    })
  }, [data]);

  
  
  
  if(loading){
    return(
      <View style={[styles.containerLoading]}>
   
      <ActivityIndicator size="large" color="#0000ff" testID='loading'/>
    
    </View>
    )
  }
  if(error){
    return(<View style={[styles.containerLoading]}>
   
      <Text>Erro no banco de dados...</Text>
    
    </View>);
  };

 
    return (
      <>
        <Header></Header>
          <View>
            <Image source={require('../../assets/loja.jpg')} testID='imagePrincipal' style={styles.imageStyle} ></Image>
            <ScrollView>
              <Text style={styles.titleCategoria}>Moda Masculina</Text>
              <SectionProduto dados={produtos.roupaHomem} />
              <Text style={styles.titleCategoria}>Moda Feminina</Text>
              <SectionProduto dados={produtos.roupaMulher} />
              <Text style={styles.titleCategoria}>Eletronicos</Text>
              <SectionProduto dados={produtos.eletronicos} />
              <Text style={styles.titleCategoria}>Joias</Text>
              <SectionProduto dados={produtos.joias} />
            </ScrollView>
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
  titleCategoria: {
    fontSize: 25,
    fontWeight: '900',
    color: '#000',
    marginVertical: 15,
    marginLeft: 5
  },
  
});

export default Home;
