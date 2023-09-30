import { PropsCart, type Action, } from "../../types/types"
import { types } from "./types"

export const addProduto = (dispatch: React.Dispatch<Action>, payload: PropsCart): void => {
  dispatch({ type: types.TYPE_ADD_CART, payload })
}

export const deleteProduct = (dispatch: React.Dispatch<Action>, payload: PropsCart): void => {
  dispatch({ type: types.TYPE_DELETE_CART, payload })
}
export const IncrementProduct = (dispatch: React.Dispatch<Action>, payload: PropsCart): void => {
  dispatch({ type: types.TYPE_INCREMENT_CART, payload })
}
export const decrementProduct = (dispatch: React.Dispatch<Action>, payload: PropsCart): void => {
  dispatch({ type: types.TYPE_DECREMENT_CART, payload })
}

