import { type Action, type PropsCartState } from "../../types/types";
import { types } from "./types";

export const reducer = (store: PropsCartState, action: Action): PropsCartState => {

  const { cart } = store


  switch (action.type) {
    case types.TYPE_ADD_CART:


      return { cart: [...cart, action.payload] };

    case types.TYPE_DELETE_CART:


      return { cart: cart.filter((item) => item.id !== action.payload.id) }

    case types.TYPE_INCREMENT_CART:

      cart.forEach((product, index) => {
        if (product.id === action.payload.id) {
          const newCart = cart.splice(index, 1, action.payload)
          return { cart: newCart }
        }
      })

      return { cart }
    case types.TYPE_DECREMENT_CART:

      cart.forEach((product, index) => {

        if (product.id === action.payload.id) {
          const newCart = cart.splice(index, 1, action.payload)

          return { cart: newCart }
        }
      })


      return { cart }

    case "RELOAD":


      return { cart: action.payload };

    default:
      return store;

  }

};
