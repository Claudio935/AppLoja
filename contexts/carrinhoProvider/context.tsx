import { createContext } from 'react'
import { type Action, type PropsCarrinhoState } from '../../types/interfaces';









export const defaultValue: PropsCarrinhoState = {
  carrinho: [


  ]
}


export const CarrinhoContext = createContext<{
  state: PropsCarrinhoState;
  dispatch: React.Dispatch<Action>;
}>({
  state: defaultValue,
  dispatch: () => null
})