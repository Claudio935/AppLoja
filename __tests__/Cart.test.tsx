import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { render, screen, fireEvent } from "@testing-library/react-native";
import "@testing-library/jest-dom";
import { Alert } from 'react-native';
import renderer from 'react-test-renderer';
import { CartContext } from '../src/contexts/cartProvider/context';
import { mockUseContext } from '../src/data/dadosMock/dadosMock';
import Cart from '../src/views/cart/Cart';
import { transformMoney } from '../src/utils/transformFunctions';
import Card from '../src/views/cart/Card';


describe("<Carrinho />", () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<CartContext.Provider value={mockUseContext}>
        <NavigationContainer>
          <Cart />
        </NavigationContainer>
      </CartContext.Provider >)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render the Cart page with products", async () => {


    const { debug } = render(
      <CartContext.Provider value={mockUseContext}>
        <Card />
      </CartContext.Provider >
    );

    debug()
    // verificando a existência do produto
    await screen.findByText("Retirar do Carrinho");
    const titleProduto = screen.getByText("testMasculino");
    const textQuantidade = screen.getByText("Quantidade: 1");
    const textPreco = screen.getByText(transformMoney(mockUseContext.store.cart[0].price));

    expect(titleProduto).toBeTruthy();
    expect(textQuantidade).toBeTruthy();
    expect(textPreco).toBeTruthy();


  });

  it("displays alert message when clicking the button", async () => {
    const alertMock = jest.spyOn(Alert, 'alert');


    const mockCarrinhoNotId = {
      store: {
        cart: [{
          title: 'testMasculino',
          image: './img/testMasculino',
          price: 1.5,
          description: 'testandoMasculino',
          id: "",
          category: "men's clothing",
          quantidade: 1,
        }],
      },
      dispatch: jest.fn()
    };


    const { getByTestId } = render(
      <CartContext.Provider value={mockCarrinhoNotId}>
        <NavigationContainer  >
          <Cart />
        </NavigationContainer>
      </CartContext.Provider>

    );
    // verificando a existência do produto

    const textRetirarCorrinho = await screen.findByText("Retirar do Carrinho");
    expect(textRetirarCorrinho).toBeTruthy()

    // ao pressionar o delete
    const retirarButton = getByTestId("retirarCarrinho0");

    fireEvent.press(retirarButton);

    expect(alertMock).toHaveBeenCalledWith("Alerta",
      "Não existe id para esse produto",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },

      ]);


  });


})