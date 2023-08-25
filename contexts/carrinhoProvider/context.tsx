import React,{ createContext } from 'react'
import { Action, PropsCarrinho, PropsCarrinhoState } from '../../types/interfaces';









export const defaultValue: PropsCarrinhoState =  {
  carrinho:[
  ]}


export const CarrinhoContext = createContext<PropsCarrinhoState>(defaultValue)