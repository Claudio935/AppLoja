import React,{ createContext } from 'react'
import { Action, PropsCarrinho } from './interfaces';






export type PropsCarrinhoState = {
  carrinho: PropsCarrinho[]
  dispatch?:React.Dispatch<Action>
}
 



export const defaultValue: PropsCarrinhoState =  {
  carrinho:[
  ]}


export const CarrinhoContext = createContext<PropsCarrinhoState>(defaultValue)