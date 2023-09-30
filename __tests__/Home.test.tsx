import React from 'react'
import { render, screen, fireEvent, waitFor, act, cleanup } from "@testing-library/react-native";
import "@testing-library/jest-dom";
import renderer from 'react-test-renderer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import App from "../App";
import useFetch from "../src/hooks/useFetch";
import { mockCart } from '../src/data/dadosMock/dadosMock';
import { transformMoney } from '../src/utils/transformFunctions';

jest.mock("../src/hooks/useFetch");

describe("<App />", () => {
  it('renders correctly', async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: mockCart.cart,
      loading: true,
      error: false,
    });
    await act(() => {
      const tree = renderer
        .create(<App></App>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    })

  });
  it("Should render the App component, go to the cart page and show itens saves in the AsyncStorage", async () => {
    await AsyncStorage.setItem('store', JSON.stringify(mockCart.cart));
    (useFetch as jest.Mock).mockReturnValue({
      data: mockCart.cart,
      loading: false,
      error: false,
    });

    render(
      <App />
    );

    const iconHeaderButton = await screen.findByTestId("iconTouch")
    fireEvent.press(iconHeaderButton);
    const incrementTouch = await screen.findByTestId(`incrementTouch${mockCart.cart[0].id}`)
    expect(incrementTouch).toBeTruthy()
    await AsyncStorage.removeItem('store')

  });
  it("Should render the App component and display loading indicator.", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: mockCart.cart,
      loading: true,
      error: false,
    });


    render(
      <App />
    );

    const loading = await screen.findByTestId('loading')
    expect(loading).toBeTruthy()


  });
  it("Should render and show msg error.", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: mockCart.cart,
      loading: false,
      error: true,
    });


    render(
      <App />
    );

    const msgError = await screen.findByText('Erro no banco de dados...')
    expect(msgError).toBeTruthy()


  });
  it("Should render the App and show Home components.", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: mockCart.cart,
      loading: false,
      error: false,
    });


    render(
      <App />
    );

    // testando aparição dos produtos na tela
    await waitFor(() => {
      mockCart.cart.forEach(item => {
        const imageProduto = screen.getByTestId(`imageProdudo${item.id}`)
        expect(screen.getByText(item.title)).toBeTruthy();
        expect(screen.getByText(transformMoney(item.price))).toBeTruthy();
        expect(imageProduto.props.source.uri).toEqual(item.image)
      });
    });


    // header
    // existe os textos no header
    const title = await screen.findByText("Mundo das vendas");
    const subTitle = await screen.findByText("Seu Aplicativo de vendas!");
    expect(title).toBeTruthy()
    expect(subTitle).toBeTruthy()


    // existência do ícone do carrinho no header
    const imagemComponent = await screen.findByTestId('headerIconImage');
    const icontButton = await screen.findByTestId('iconTouch');
    expect(imagemComponent).toBeTruthy();
    expect(icontButton).toBeTruthy();


    // imagem principal
    const imagePrincipal = await screen.findByTestId("imagePrincipal")
    expect(imagePrincipal).toBeTruthy()

    // textos que mostram as categorias
    const textCategoriaMasculina = await screen.findByText("Moda Masculina");
    const textCategoriaFeminina = await screen.findByText("Moda Feminina");
    const textCategoriaEletronico = await screen.findByText("Eletronicos");
    const textCategoriaJoia = await screen.findByText("Joias");


    expect(textCategoriaMasculina).toBeTruthy();
    expect(textCategoriaFeminina).toBeTruthy();
    expect(textCategoriaEletronico).toBeTruthy();
    expect(textCategoriaJoia).toBeTruthy();


  });
  it("renders the main path of the app and test functionalities", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: mockCart.cart,
      loading: false,
      error: false,
    });


    render(
      <App />
    );


    // vai para pagina do produto
    const buttonProduto = await screen.findByTestId(`imageProdutoButton1`);
    fireEvent.press(buttonProduto);

    // adiciona a quantidade
    const buttonIncrement = await screen.findByTestId(`increment`);
    fireEvent.press(buttonIncrement);
    fireEvent.press(buttonIncrement);

    // vai para a página do carrinho
    const buttoncart = await screen.findByTestId(`carrinhoButton`);
    fireEvent.press(buttoncart);

    // adiona e remove a quantidade do produto
    const increment = await screen.findByTestId("incrementTouch0")
    const decrement = await screen.findByTestId("decrementTouch0")
    fireEvent.press(increment)
    fireEvent.press(increment)

    const textQuantifyInitial = await screen.findByText("Quantidade: 4")
    expect(textQuantifyInitial).toBeTruthy()
    fireEvent.press(decrement)
    fireEvent.press(decrement)

    const textQuantifyFinal = await screen.findByText("Quantidade: 2")
    expect(textQuantifyFinal).toBeTruthy()


    // volta para pagina de home
    const buttonVoltarHome = await screen.findByTestId("voltarHomeButton");
    expect(buttonVoltarHome).toBeTruthy();
    fireEvent(buttonVoltarHome, 'press');

    // testa pra ver se ta na página home
    const titleText = await screen.findByText("Mundo das vendas");
    expect(titleText).toBeTruthy();


  });
  afterEach(() => {
    jest.restoreAllMocks();
    cleanup()
  });
});
