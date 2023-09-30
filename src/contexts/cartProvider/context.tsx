import { createContext } from 'react'
import { type Action, type PropsCartState } from '../../types/types';


export const defaultValue: PropsCartState = {
  cart: []
}


export const CartContext = createContext<{
  store: PropsCartState;
  dispatch: React.Dispatch<Action>;
}>({
  store: defaultValue,
  dispatch: () => null
})