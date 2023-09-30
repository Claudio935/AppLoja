import React, { useContext, } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert
} from 'react-native';
import { CartContext } from '../../contexts/cartProvider/context';
import { type PropsCart } from '../../types/types';
import { IncrementProduct, decrementProduct, deleteProduct } from '../../contexts/cartProvider/actions';
import { transformMoney } from '../../utils/transformFunctions';


function Card(): JSX.Element {

  const { store: { cart }, dispatch } = useContext(CartContext);


  const handleIncrementProduct = (objectProduct: PropsCart): void => {

    if (typeof objectProduct?.id === "string" && objectProduct?.id.length === 0) {

      return
    };
    const newQuantidade = objectProduct.quantidade + 1
    const newObjectProduct = { ...objectProduct, quantidade: newQuantidade }
    IncrementProduct(dispatch, newObjectProduct)


  };
  const handleDecrementProduct = (objectProduct: PropsCart): void => {

    if (typeof objectProduct?.id === "string" && objectProduct?.id.length === 0) {
      return

    };
    if (objectProduct.quantidade === 0) {
      return
    }
    const newQuantidade = objectProduct.quantidade - 1

    const newObjectProduct = { ...objectProduct, quantidade: newQuantidade }
    decrementProduct(dispatch, newObjectProduct)


  };
  const handleDeleteProduct = (objectProduct: PropsCart): void => {
    if (typeof objectProduct?.id === "string" && objectProduct?.id.length === 0) {
      Alert.alert(
        "Alerta",
        "Não existe id para esse produto",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },

        ]
      );

    };
    deleteProduct(dispatch, objectProduct)
  };

  return (
    <>
      {cart.map((item, index) => {
        return (
          <View style={styles.containerCarrinhoItem} key={index} >
            <Image source={{ uri: item.image }} style={{ width: '40%', height: '100%' }} />
            <View style={styles.containerCarrinhoTextButton}>
              <View style={styles.containerCarrinhoText}>
                <Text style={styles.titleProduto}>{item.title}</Text>
                <Text style={styles.quantidade}>Quantidade: {item.quantidade}</Text>
                <Text style={styles.price}>{transformMoney(item.price * item.quantidade)}</Text>
                <View style={styles.viewDecrementIncremment}>
                  <Pressable style={styles.buttonIncrement} onPress={() => { handleIncrementProduct(item); }} testID={`incrementTouch${index}`}>
                    <Text style={styles.textButton}>+</Text>
                  </Pressable>
                  <Pressable testID={`decrementTouch${index}`} style={styles.buttonDecrement} onPress={() => { handleDecrementProduct(item); }}>
                    <Text style={styles.textButton}>-</Text>
                  </Pressable>
                </View>
              </View>
              <Pressable testID={`retirarCarrinho${index}`} style={styles.button} onPress={() => { handleDeleteProduct(item); }} >
                <Text style={styles.textButton}>Retirar do Carrinho</Text>
              </Pressable>
            </View>
          </View>
        )
      })}
    </>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    marginBottom: 20
  },
  titleCarrinho: {
    textAlign: 'center',
    fontWeight: '900',
    color: '#000',
    fontSize: 30,
    marginBottom: 5
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    padding: 20
  },
  containerCarrinhoItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    height: 190,
  },
  containerCarrinhoText: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    width: '90%',
    height: '70%'
  },
  containerCarrinhoTextButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '60%',
    height: '100%'
  },
  viewDecrementIncremment: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingVertical: 15,
    width: 100
  },
  buttonIncrement: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    backgroundColor: '#1acd20',
    borderRadius: 100,
    padding: 7,
  },
  buttonDecrement: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    backgroundColor: '#fe0f0f',
    borderRadius: 100,
    padding: 7,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    backgroundColor: '#fe0f0f',
    borderRadius: 15,
    padding: 7,
  },
  textButton: {
    color: '#fff',
    fontWeight: '900'
  },
  titleProduto: {
    fontSize: 16,
    color: '#000',
    fontWeight: '900'
  },
  quantidade: {
    fontSize: 14,
    color: '#000',
    fontWeight: '700',
    paddingVertical: 15
  },
  price: {
    fontSize: 14,
    color: '#b71919',
    fontWeight: '900',
    padding: 5
  }
});


export default Card;