import { Action, Payload } from "./interfaces"
import { types } from "./types"

export const loadMovies = (dispatch: React.Dispatch<Action>, payload:Payload) =>{
  dispatch({type: types.TYPE_ADD_CARRINHO, payload: payload})
}



