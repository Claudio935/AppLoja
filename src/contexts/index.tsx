import React, { useReducer, useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartContext, defaultValue } from "./cartProvider/context";
import { reducer } from "./cartProvider/reducer";


type Props = {

  children: JSX.Element,
};


export const CartProvider: React.FC<Props> = ({ children }: Props) => {
  const [store, dispatch] = useReducer(reducer, defaultValue)


  useEffect(() => {
    // Pega o valor salvo
    AsyncStorage.getItem('store').then((value) => {

      if (!value) return
      // Atualiza meu contexto
      dispatch({ type: "RELOAD", payload: JSON.parse(value) })

    });

  }, []);

  useEffect(() => {

    // Salva o item localmente sendo a chave store
    AsyncStorage.setItem('store', JSON.stringify(store.cart));
  }, [store]);

  return <CartContext.Provider value={{ store, dispatch }}>{children}</CartContext.Provider>
}