import React, { useReducer } from "react"
import { CarrinhoContext, defaultValue } from "./carrinhoProvider/context";
import { reducer } from "./carrinhoProvider/reducer";


interface Props {

  children: JSX.Element,
};


export const CarrinhoProvider: React.FC<Props> = ({ children }: Props) => {
  const [carrinho, setState] = useReducer(reducer, defaultValue)

  return <CarrinhoContext.Provider value={{ state: { carrinho: [...carrinho.carrinho] }, dispatch: setState }}>{children}</CarrinhoContext.Provider>
}