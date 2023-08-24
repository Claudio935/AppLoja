import { Action, Payload } from "./interfaces"
import { types } from "./types"

export const addProduto = (dispatch: React.Dispatch<Action>, payload:Payload) =>{
  dispatch({type: types.TYPE_ADD_CARRINHO, payload: payload})
}

export const deteleProduto = (dispatch: React.Dispatch<Action>, payload:Payload) =>{
  dispatch({type: types.TYPE_DELETE_CARRINHO, payload: payload})
}



