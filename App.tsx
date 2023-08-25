import React from 'react';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './views/home/Home';
import Produto from './views/produto/Produto';
import { CarrinhoProvider } from './contexts';
import Carrinho from './views/carrinho/Carrinho';
import { RootStackParamList } from './types/interfaces';





export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {

  return (
    <CarrinhoProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name="Produto" component={Produto} />
          <Stack.Screen name="Carrinho" component={Carrinho} />
        </Stack.Navigator>
      </NavigationContainer>
    </CarrinhoProvider>
  );
}



export default App;
