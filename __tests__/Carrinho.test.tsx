import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import Home from "../views/home/Home";
import { render, screen, fireEvent} from "@testing-library/react-native";
import "@testing-library/jest-dom";
import { Alert } from 'react-native';
import renderer from 'react-test-renderer';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/interfaces";
import Produto from "../views/produto/Produto";
import Carrinho from "../views/carrinho/Carrinho";
import { CarrinhoContext } from '../contexts/carrinhoProvider/context';
import { mockCarrinho } from '../dadosMock/dadosMock';

const mockCarrinhoContext = {
    carrinho: [{...mockCarrinho[0],
    quantidade:'1'}],
    dispatch: jest.fn()
};



describe("<Carrinho />", () => {
    it('renders correctly', () => {
        const Stack = createNativeStackNavigator<RootStackParamList>();
        const useContextSpy = jest.spyOn(React, 'useContext');
        useContextSpy.mockReturnValue(mockCarrinhoContext);
        const tree = renderer
          .create( <CarrinhoContext.Provider value={mockCarrinhoContext}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Produto" component={Produto} />
                <Stack.Screen name="Carrinho" component={Carrinho} />
              </Stack.Navigator>
            </NavigationContainer>
          </CarrinhoContext.Provider >)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    
    it("Should render the Cart page with products", async () => {
        const Stack = createNativeStackNavigator<RootStackParamList>();

       

        const useContextSpy = jest.spyOn(React, 'useContext');
        useContextSpy.mockReturnValue(mockCarrinhoContext);

        render(
            <CarrinhoContext.Provider value={mockCarrinhoContext}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Carrinho" component={Carrinho} />
                        <Stack.Screen name="Home" component={Home} />
                    </Stack.Navigator>
                </NavigationContainer>
            </CarrinhoContext.Provider>

        );
        //verificando a existência do produto
        await screen.findByText("Retirar do Carrinho");
        const titleProduto = screen.getByText("testMasculino");
        const textQuantidade = screen.getByText("Quantidade: 1");
        const textPreco = screen.getByText("R$ 1.5");

        expect(titleProduto).toBeTruthy();
        expect(textQuantidade).toBeTruthy();
        expect(textPreco).toBeTruthy();
   
     
        useContextSpy.mockRestore();

    });

    it("displays alert message when clicking the button", async () => {
        const Stack = createNativeStackNavigator<RootStackParamList>();
        const alertMock = jest.spyOn(Alert, 'alert');
        alertMock.mockImplementation(() => {});

        const mockCarrinhoNotId = {
            carrinho: [{
                title: 'testMasculino',
                image: undefined,
                quantidade: '1',
                price: 1.5,
                description: 'testandoMasculino',
                id: undefined,
                category: "men's clothing"
            }],
            dispatch: jest.fn()
        };

      

        const useContextSpy = jest.spyOn(React, 'useContext');
        useContextSpy.mockReturnValue(mockCarrinhoNotId);

        const { debug } = render(
            <CarrinhoContext.Provider value={mockCarrinhoNotId}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Carrinho" component={Carrinho} />
                        <Stack.Screen name="Home" component={Home} />
                    </Stack.Navigator>
                </NavigationContainer>
            </CarrinhoContext.Provider>

        );
        //verificando a existência do produto
       

        //ao pressionar o delete
        const retirarButton = screen.getByTestId("retirarCarrinho");
        fireEvent.press(retirarButton);

        expect(alertMock).toHaveBeenCalled();


    });


    afterEach(() => {
        jest.restoreAllMocks();
      });
})