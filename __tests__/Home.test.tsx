import React from 'react'
import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import "@testing-library/jest-dom";
import renderer from 'react-test-renderer';
import App from "../App";
import useFetch from "../hooks/useFetch";
import { mockCarrinho } from '../dadosMock/dadosMock';




jest.mock("../hooks/useFetch");

describe("<App />", () => {
    it('renders correctly', () => {
        (useFetch as jest.Mock).mockReturnValue({
            data: mockCarrinho,
            loading: true,
            error: false,
        });
        const tree = renderer
            .create(<App></App>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("Should render the App component and display loading indicator.", async () => {
        (useFetch as jest.Mock).mockReturnValue({
            data: mockCarrinho,
            loading: true,
            error: false,
        });

        render(
            <App />
        );
        const loading = screen.getByTestId('loading')
        expect(loading).toBeTruthy()


    });
    it("Should render msg error.", async () => {
        (useFetch as jest.Mock).mockReturnValue({
            data: mockCarrinho,
            loading: false,
            error: true,
        });

        render(
            <App />
        );
        const msgError = screen.getByText('Erro no banco de dados...')
        expect(msgError).toBeTruthy()


    });
    it("Should render the App and show components.", async () => {
        (useFetch as jest.Mock).mockReturnValue({
            data: mockCarrinho,
            loading: false,
            error: false,
        });

        render(
            <App />
        );
        //testando aparição dos produtos na tela
        await waitFor(() => {
            mockCarrinho.forEach(item => {
                const imageProduto = screen.getByTestId(`imageProdudo${item.id}`)
                expect(screen.getByText(item.title)).toBeTruthy();
                expect(screen.getByText(`R$ ${item.price}`)).toBeTruthy();
                expect(imageProduto.props.source.uri).toEqual(item.image)
            });
        });


        //header
        //existe os textos no header
        const title = screen.getByText("Mundo das vendas");
        const subTitle = screen.getByText("Seu Aplicativo de vendas!");
        expect(title).toBeTruthy()
        expect(subTitle).toBeTruthy()



        //icone existência 
        const imagemComponent = screen.getByTestId('headerIconImage');
        const icontButton = screen.getByTestId('iconTouch');
        expect(imagemComponent).toBeTruthy();
        expect(icontButton).toBeTruthy();


        //imagem principal 
        const imagePrincipal = screen.getByTestId("imagePrincipal")
        expect(imagePrincipal).toBeTruthy()

        // textos que mostram as categorias
        const textCategoriaMasculina = screen.getByText("Moda Masculina");
        const textCategoriaFeminina = screen.getByText("Moda Feminina");
        const textCategoriaEletronico = screen.getByText("Eletronicos");
        const textCategoriaJoia = screen.getByText("Joias");


        expect(textCategoriaMasculina).toBeTruthy();
        expect(textCategoriaFeminina).toBeTruthy();
        expect(textCategoriaEletronico).toBeTruthy();
        expect(textCategoriaJoia).toBeTruthy();



    });
    it("renders the main path of the app", async () => {
        (useFetch as jest.Mock).mockReturnValue({
            data: mockCarrinho,
            loading: false,
            error: false,
        });

        render(
            <App />
        );
        //testando
        await waitFor(() => {
            mockCarrinho.forEach(item => {
                const imageProduto = screen.getByTestId(`imageProdudo${item.id}`)
                expect(screen.getByText(item.title)).toBeTruthy();
                expect(screen.getByText(`R$ ${item.price}`)).toBeTruthy();
                expect(imageProduto.props.source.uri).toEqual(item.image);
            });
            //vai para pagina do produto
            const buttonProduto = screen.getByTestId(`imageProdutoButton1`);
            fireEvent.press(buttonProduto);

            //adiciona a quantidade
            const buttonIncrement = screen.getByTestId(`increment`);
            fireEvent.press(buttonIncrement);

            //vai para a página do carrinho e adiciona ao carrinho
            const buttoncarrinho = screen.getByTestId(`carrinhoButton`);
            fireEvent.press(buttoncarrinho);

            //deleta um item da lista de produto
            const buttonRetirar = screen.getByTestId(`retirarCarrinho`);
            fireEvent.press(buttonRetirar);

            //volta para pagina de home
            const buttonVoltarHome = screen.getByTestId("voltarHomeButton");
            expect(buttonVoltarHome).toBeTruthy();
            fireEvent(buttonVoltarHome, 'press');

            //testa pra ver se ta na página home
            const titleText = screen.getByText("Mundo das vendas");
            expect(titleText).toBeTruthy();
        });

    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
});
