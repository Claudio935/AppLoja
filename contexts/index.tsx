import {useReducer} from "react"
import { CarrinhoContext,  defaultValue } from "./carrinhoProvider/context";
import { reducer } from "./carrinhoProvider/reducer";
import { PropsCarrinho } from "../types/interfaces";

interface Props {
   
    children: JSX.Element,
  };


export const CarrinhoProvider = ({children}:Props) =>{
      const [carrinho, setState] = useReducer(reducer, defaultValue)
 
    return<CarrinhoContext.Provider value={{carrinho: [...carrinho.carrinho], dispatch: setState}}>{children}</CarrinhoContext.Provider>
}