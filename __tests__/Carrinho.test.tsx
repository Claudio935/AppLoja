import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import Home from "../views/home/Home";
import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import "@testing-library/jest-dom";
import App from "../App";
import { useFetch } from "../hooks/useFetch";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/interfaces";
import Produto from "../views/produto/Produto";
import Carrinho from "../views/carrinho/Carrinho";
import { CarrinhoProvider } from "../contexts";
import { CarrinhoContext } from '../contexts/carrinhoProvider/context';
import { types } from '../contexts/carrinhoProvider/types';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');


describe("<Home />", () => {
    it("Should render the Cart page with products and verify the delete button action", async () => {
        const Stack = createNativeStackNavigator<RootStackParamList>();

        const mockCarrinho = {
            carrinho: [{
                title: 'testMasculino',
                image: undefined,
                quantidade: '1',
                price: 1.5,
                description: 'testandoMasculino',
                id: '1',
                category: "men's clothing"
            }],
            dispatch: jest.fn()
        };

        const useContextSpy = jest.spyOn(React, 'useContext');
        useContextSpy.mockReturnValue(mockCarrinho);

        const { debug } = render(
            <CarrinhoContext.Provider value={mockCarrinho}>
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

        //ao pressionar o delete
        const retirarButton = screen.getByTestId("retirarCarrinho");
        fireEvent.press(retirarButton);
        expect(titleProduto).toBeTruthy();




        expect(mockCarrinho.dispatch).toHaveBeenCalledWith({
            type: types.TYPE_DELETE_CARRINHO,
            payload: mockCarrinho.carrinho[0],
        });

        useContextSpy.mockRestore();

    });


    it("Should display the Carrinho page with a button to return to the home page", async () => {
        const Stack = createNativeStackNavigator<RootStackParamList>();

        render(

            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Carrinho" component={Carrinho} />
                    <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>
            </NavigationContainer>


        );

        //testando click do botão de voltar a home
        const buttonVoltarHome = screen.getByTestId("voltarHomeButton")
        expect(buttonVoltarHome).toBeTruthy();
        fireEvent(buttonVoltarHome, 'press');

        const titleHome = screen.getByTestId("loading");
        expect(titleHome).toBeTruthy();



    });

})