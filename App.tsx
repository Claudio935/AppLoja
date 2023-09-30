import React from 'react';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/views/home/Home';
import Produto from './src/views/product/Product';
import { CartProvider } from './src/contexts';
import Cart from './src/views/cart/Cart';
import { RootStackParamList } from './src/types/types';


export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {

  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name="Produto" component={Produto} />
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}


export default App;
