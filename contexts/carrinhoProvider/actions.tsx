import { type Action, type Payload } from "../../types/interfaces"
import { types } from "./types"

export const addProduto = (dispatch: React.Dispatch<Action>, payload: Payload): void => {
  dispatch({ type: types.TYPE_ADD_CARRINHO, payload })
}

export const deteleProduto = (dispatch: React.Dispatch<Action>, payload: Payload): void => {
  dispatch({ type: types.TYPE_DELETE_CARRINHO, payload })
}



