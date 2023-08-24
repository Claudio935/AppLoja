import { PropsCarrinhoState } from "./context";
import { Action, PropsCarrinho, PropsUserContextState } from "./interfaces";
import { types } from "./types";

export const reducer = (state: PropsCarrinhoState, action: Action) => {
 

  switch (action.type) {
    case types.TYPE_ADD_CARRINHO:
     if(state?.carrinho)
      return {carrinho:[...state?.carrinho, action.payload]};
   

    default:
      return state;
  }
 
};
