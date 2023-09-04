import { NavigationContainer } from "@react-navigation/native";
import { render, screen, fireEvent } from "@testing-library/react-native";
import "@testing-library/jest-dom";
import React from "react";
import { Alert } from "react-native";
import renderer from 'react-test-renderer';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/interfaces";
import Produto from "../views/produto/Produto";
import Carrinho from "../views/carrinho/Carrinho";
import { CarrinhoProvider } from "../contexts";
import { CarrinhoContext } from "../contexts/carrinhoProvider/context";
import { mockCarrinho } from "../dadosMock/dadosMock";


const mockUseContext = {
  carrinho: [
    mockCarrinho[0]
  ],
  dispatch: jest.fn()
}

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: () => ({
    params: mockCarrinho[0],
  }),
}));

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Alert.alert = jest.fn();
  return RN;
});

describe("<Produto />", () => {
  it('renders correctly', () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    const tree = renderer
      .create(<CarrinhoProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Produto" component={Produto} />
            <Stack.Screen name="Carrinho" component={Carrinho} />
          </Stack.Navigator>
        </NavigationContainer>
      </CarrinhoProvider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render and show components ", async () => {

    const Stack = createNativeStackNavigator<RootStackParamList>();


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
    const titleProduto = screen.getByText(`${mockCarrinho[0].title}`)
    const descriptionProduto = screen.getByText(`${mockCarrinho[0].description}`);
    expect(imgProduto).toBeTruthy();
    expect(titleProduto).toBeTruthy();
    expect(descriptionProduto).toBeTruthy();
    expect(imgProduto.props.source.uri).toEqual(`${mockCarrinho[0].image}`);





  });
  it("changes quantity and price correctly.", async () => {

    const Stack = createNativeStackNavigator<RootStackParamList>();

    const useContextSpy = jest.spyOn(React, 'useContext');
    useContextSpy.mockReturnValue(mockUseContext);

    render(
      <CarrinhoContext.Provider value={mockUseContext}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Produto" component={Produto} />
            <Stack.Screen name="Carrinho" component={Carrinho} />
          </Stack.Navigator>
        </NavigationContainer>
      </CarrinhoContext.Provider>

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
    expect(buttonQuantidadeDecrement).toBeTruthy();

    fireEvent.press(buttonQuantidadeIncrement);
    fireEvent.press(buttonQuantidadeIncrement);

    expect(textQuantidade.props.children).toEqual(2);
    fireEvent.press(buttonQuantidadeDecrement);
    expect(textQuantidade.props.children).toEqual(1);




    const textPrice = screen.getByText(`R$ ${mockCarrinho[0].price}`);

    expect(textPrice).toBeTruthy();

    fireEvent.press(buttonQuantidadeDecrement);
    fireEvent.press(buttonQuantidadeDecrement);
    expect(textQuantidade.props.children).toEqual(0);





  });
  it("Test the quantity and price change action of an item on button click and show alert id", async () => {

    const Stack = createNativeStackNavigator<RootStackParamList>();

    const useContextSpy = jest.spyOn(React, 'useContext');
    useContextSpy.mockReturnValue(mockUseContext);

    render(
      <CarrinhoContext.Provider value={mockUseContext}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Produto" component={Produto} />
            <Stack.Screen name="Carrinho" component={Carrinho} />
          </Stack.Navigator>
        </NavigationContainer>
      </CarrinhoContext.Provider>

    );


    const buttonQuantidadeIncrement = screen.getByTestId("increment");
    fireEvent.press(buttonQuantidadeIncrement);

    //testando o alert da quantidade
    const texButton = screen.getByText('Adicionar ao Carrinho');
    expect(texButton).toBeTruthy();
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

    const Stack = createNativeStackNavigator<RootStackParamList>();



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



    const texButton = screen.getByText('Adicionar ao Carrinho');
    expect(texButton).toBeTruthy();
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
  });
});