import { types } from "../contexts/cartProvider/types";

export type PropsCart = {

  title: string;
  image: string;
  quantidade: number;
  price: number;
  description: string;
  id: string;
  category: string;
}


export type Action = {
  type: types;
  payload: PropsCart;
} | {
  type: "RELOAD";
  payload: PropsCart[];
}


export type PropsCartState = {
  cart: PropsCart[]

}
export type PropsCarrinhoReducer = {
  cart: PropsCart[]
  dispatch: React.Dispatch<Action>
}


export type ProdutosType = {
  roupaHomem: PropsCart[];
  roupaMulher: PropsCart[];
  joias: PropsCart[];
  eletronicos: PropsCart[];
}


export type RootStackParamList = {
  Home: undefined;
  Produto: PropsCart | undefined;
  Cart: undefined;
}
