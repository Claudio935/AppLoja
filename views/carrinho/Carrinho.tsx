import { RouteProp} from '@react-navigation/native';
import React, {  useContext } from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { CarrinhoContext } from '../../contexts/carrinhoProvider/context';
import { RootStackParamList } from '../../App';




type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Carrinho'>;

function Carrinho(): JSX.Element {






 
  const { carrinho, dispatch } = useContext(CarrinhoContext)


 


 


  return (
    <ScrollView>
    <View style={styles.Container}>
      {carrinho.map((item)=>{return(
        <View style={styles.ContainerCarrinhoItem}>
          <Image source={{uri:item.image}} style={{width:'40%', height:'100%'}}/>
        <View style={styles.ContainerCarrinhoTextButton}>
        <View style={styles.ContainerCarrinhoText}>
        <Text style={{ fontSize: 16, color: '#000' }}>{item.title}</Text>
        <Text style={{ fontSize: 14, color: '#000' }}>Quantidade: {item.quantidade}</Text>
        <Text style={{ fontSize: 14, color: '#b71919' }}> R$ {item.price}</Text>
        </View>
        <TouchableOpacity style={styles.Button}>
    <Text style={styles.TextButton}>Retirar do Carrinho</Text>
</TouchableOpacity>
        </View>
        </View>
      )})}
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
    width:'100%',
    padding: 20
   
  },
  

  ContainerCarrinhoItem:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    flexDirection:'row',
    marginTop: 10,
    marginBottom:10,

    height:190,
    
  },
  ContainerCarrinhoText:{
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection:'column',
    width: '90%',
    height:'70%'
  },
  ContainerCarrinhoTextButton:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column',
    width: '60%',
    height:'100%'
  },

  Button:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35, 
    backgroundColor:'red',
    borderRadius: 15,
    padding:7,
    
  },
  TextButton:{
    color:'#fff',
    fontWeight:'900'
  }
});


export default Carrinho;