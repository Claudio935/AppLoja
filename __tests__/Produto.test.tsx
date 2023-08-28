import { NavigationContainer } from "@react-navigation/native";
import { render, screen, fireEvent } from "@testing-library/react-native";
import "@testing-library/jest-dom";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/interfaces";
import Produto from "../views/produto/Produto";
import Carrinho from "../views/carrinho/Carrinho";
import { CarrinhoProvider } from "../contexts";
import React from "react";

const mockCarrinho = {
  title: 'testMasculino',
  image: './img/test',
  price: 1.5,
  description: 'testandoMasculino',
  id: '1',
  category: "men's clothing"
};


jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: () => ({
    params: mockCarrinho,
  }),
}));


describe("<Home />", () => {
  it("should render a header of the Home with Text and Button", async () => {

    const Stack = createNativeStackNavigator<RootStackParamList>();

    const useContextSpy = jest.spyOn(React, 'useContext');
    useContextSpy.mockReturnValue(mockCarrinho);

  render(
      <CarrinhoProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Produto" component={Produto} />
            <Stack.Screen name="Carrinho" component={Carrinho} />
          </Stack.Navigator>
        </NavigationContainer>
      </CarrinhoProvider>

    );

    //testando a aparição do produto
    const imgProduto = screen.getByTestId('imageProduto');
    const titleProduto = screen.getByText(`${mockCarrinho.title}`)
    const descriptionProduto = screen.getByText(`${mockCarrinho.description}`);
    expect(titleProduto).toBeTruthy();
    expect(descriptionProduto).toBeTruthy();
    expect(imgProduto.props.source.uri).toEqual(`${mockCarrinho.image}`);


    useContextSpy.mockRestore();


  });
  it("Test the quantity and price change action of an item on button click and page navigation on another button click.", async () => {

    const Stack = createNativeStackNavigator<RootStackParamList>();

    const useContextSpy = jest.spyOn(React, 'useContext');
    useContextSpy.mockReturnValue(mockCarrinho);

    render(
      <CarrinhoProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Produto" component={Produto} />
            <Stack.Screen name="Carrinho" component={Carrinho} />
          </Stack.Navigator>
        </NavigationContainer>
      </CarrinhoProvider>

    );


    //testando adição de quantidade e a mudança do preço
    const textQuantidade = screen.getByTestId('textQuantidade');

    const buttonQuantidadeIncrement = screen.getByTestId("increment");
    const buttonQuantidadeDecrement = screen.getByTestId("decrement");
    const textButtonQuantidadeIncrement = screen.getByText(">");
    const textButtonQuantidadeDecrement = screen.getByText("<");

    expect(textButtonQuantidadeIncrement).toBeTruthy();
    expect(textButtonQuantidadeDecrement).toBeTruthy();
    
    expect(buttonQuantidadeIncrement).toBeTruthy();
    fireEvent.press(buttonQuantidadeIncrement);
    fireEvent.press(buttonQuantidadeIncrement);

    expect(textQuantidade.props.children).toEqual(2);
    fireEvent.press(buttonQuantidadeDecrement);
    expect(textQuantidade.props.children).toEqual(1);


    const textPrice = screen.getByText(`R$ ${mockCarrinho.price}`);

    expect(textPrice).toBeTruthy();


    //mudança de página
    const texButton = screen.getByText('Adicionar ao Carrinho');
    expect(texButton).toBeTruthy();
    const button = screen.getByTestId('carrinhoButton');

    fireEvent.press(button);


    const titleCarrinho = await screen.findByText('Itens do carrinho');

    expect(titleCarrinho).toBeTruthy();

    useContextSpy.mockRestore();


  });
});