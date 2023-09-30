import { render, screen, fireEvent, cleanup } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import "@testing-library/jest-dom";
import React from "react";
import { Alert } from "react-native";
import renderer from 'react-test-renderer';
import Product from "../src/views/product/Product";

import { CartContext } from "../src/contexts/cartProvider/context";
import { mockCart } from "../src/data/dadosMock/dadosMock";
import { transformMoney } from "../src/utils/transformFunctions";


const mockUseContext = {
  store: {
    cart:
      [
        mockCart.cart[0]
      ],
  },

  dispatch: jest.fn()
}

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: () => ({
    params: mockCart.cart[0],
  }),
}));

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Alert.alert = jest.fn();
  return RN;
});

describe("<Product />", () => {
  beforeEach(() => {
    render(
      <CartContext.Provider value={mockUseContext}>
        <NavigationContainer>
          <Product />
        </NavigationContainer>
      </CartContext.Provider>

    );
  });
  it('renders correctly', () => {


    const tree = renderer
      .create(
        <NavigationContainer>
          <Product />
        </NavigationContainer>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render and show components ", async () => {

    // testando a aparição do produto
    const imgProduto = screen.getByTestId('imageProduto');
    const titleProduto = screen.getByText(`${mockCart.cart[0].title}`)
    const descriptionProduto = screen.getByText(`${mockCart.cart[0].description}`);


    expect(imgProduto).toBeTruthy();
    expect(titleProduto).toBeTruthy();
    expect(descriptionProduto).toBeTruthy();
    expect(imgProduto.props.source.uri).toEqual(`${mockCart.cart[0].image}`);

    // testando a existencia dos componentes relacionado á quantidade do produto
    const buttonQuantidadeIncrement = screen.getByTestId("increment");
    const buttonQuantidadeDecrement = screen.getByTestId("decrement");
    const textButtonQuantidadeIncrement = screen.getByText(">");
    const textButtonQuantidadeDecrement = screen.getByText("<");


    expect(textButtonQuantidadeIncrement).toBeTruthy();
    expect(textButtonQuantidadeDecrement).toBeTruthy();

    expect(buttonQuantidadeIncrement).toBeTruthy();
    expect(buttonQuantidadeDecrement).toBeTruthy();

    // testando a existencia do botão de carrinho
    const texButton = screen.getByText('Adicionar ao Carrinho');
    expect(texButton).toBeTruthy();


  });

  it("changes quantity and price correctly.", async () => {


    const useContextSpy = jest.spyOn(React, 'useContext');
    useContextSpy.mockReturnValue(mockUseContext);

    // testando adição de quantidade e a mudança do preço
    const textQuantidade = screen.getByTestId('textQuantidade');

    const buttonQuantidadeIncrement = screen.getByTestId("increment");
    const buttonQuantidadeDecrement = screen.getByTestId("decrement");


    fireEvent.press(buttonQuantidadeIncrement);
    fireEvent.press(buttonQuantidadeIncrement);

    expect(textQuantidade.props.children).toEqual(2);
    fireEvent.press(buttonQuantidadeDecrement);
    expect(textQuantidade.props.children).toEqual(1);


    const textPrice = screen.getByText(transformMoney(mockCart.cart[0].price));

    expect(textPrice).toBeTruthy();

    fireEvent.press(buttonQuantidadeDecrement);
    fireEvent.press(buttonQuantidadeDecrement);
    expect(textQuantidade.props.children).toEqual(0);


  });
  it("Test the quantity and price change action of an item on button click and show alert id", async () => {


    const buttonQuantidadeIncrement = screen.getByTestId("increment");
    fireEvent.press(buttonQuantidadeIncrement);

    // testando o alert da quantidade

    const button = screen.getByTestId('carrinhoButton');

    fireEvent.press(button);

    expect(Alert.alert as jest.Mock).toHaveBeenCalledWith("Alerta",
      "Produto já adicionado?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },

      ]);


  });
  it("shows alert for lack of product quantity", async () => {


    const button = screen.getByTestId('carrinhoButton');

    fireEvent.press(button);


    expect(Alert.alert as jest.Mock).toHaveBeenCalledWith("Alerta",
      "Adicione uma quantidade de produto",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },

      ]);

  });

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup()
  });
});