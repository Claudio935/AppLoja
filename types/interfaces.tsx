export type PropsCarrinho = {

  title: string;
  image: string;
  quantidade: string;
  price: number;
  description: string;
  id: string;
  category: string;
}


export type Payload = PropsCarrinho;


export type Action = {
  type: string;
  payload: Payload
}


export type PropsCarrinhoState = {
  carrinho: PropsCarrinho[]

}
export type PropsCarrinhoReducer = {
  carrinho: PropsCarrinho[]
  dispatch: React.Dispatch<Action>
}


export type ProdutosType = {
  roupaHomem: PropsCarrinho[];
  roupaMulher: PropsCarrinho[];
  joias: PropsCarrinho[];
  eletronicos: PropsCarrinho[];
}


export type RootStackParamList = {
  Home: undefined;
  Produto: PropsCarrinho | undefined;
  Carrinho: undefined;
}
