import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView
} from 'react-native';
import Header from './components/header/Header';
import { useFetch } from './hooks/useFetch';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './views/home/Home';
import Produto from './views/produto/Produto';
import { CarrinhoProvider } from './contexts';
import Carrinho from './views/carrinho/Carrinho';




export type RootStackParamList = {
  Home: undefined;
  Produto: { title:string, image: string, price: number, category: string, description:string, id:string } | undefined;
 Carrinho:  undefined;
};
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();



function App(): JSX.Element {



  return (
    <CarrinhoProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name="Produto" component={Produto}/>
        <Stack.Screen name="Carrinho" component={Carrinho}/>
      </Stack.Navigator>
    </NavigationContainer>
    </CarrinhoProvider>
  );
}



export default App;
