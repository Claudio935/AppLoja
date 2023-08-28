import { Action, PropsCarrinho, PropsCarrinhoState } from "../../types/interfaces";
import { types } from "./types";

export const reducer = (state: PropsCarrinhoState, action: Action) => {
 

  switch (action.type) {
    case types.TYPE_ADD_CARRINHO:
     if(state?.carrinho)
      return {carrinho:[...state?.carrinho, action.payload]};
   
      case types.TYPE_DELETE_CARRINHO:
      
        if(state?.carrinho){
          
          return {carrinho: state?.carrinho.filter((item)=> item.id !== action.payload.id)}
        }

   
    default:
      return state;
  }
 
};
