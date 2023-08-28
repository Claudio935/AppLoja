import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import "@testing-library/jest-dom";
import App from "../App";
import { useFetch } from "../hooks/useFetch";

const mockCarrinho = [{
    title: 'testMasculino',
    image: './img/testMasculino',
    price: 1.5,
    description: 'testandoMasculino',
    id: '1',
    category: "men's clothing"

},
{
    title: 'testFeminino',
    image: './img/testFeminino',
    price: 2,
    description: 'testandoFeminino',
    id: '2',
    category: "women's clothing"

},
{
    title: 'testEletronico',
    image: './img/testEletronico',
    price: 3,
    description: 'testandoEletronico',
    id: '3',
    category: "electronics"

},

{
    title: 'testJoia',
    image: './img/testJoia',
    price: 4,
    description: 'testandoJoia',
    id: '4',
    category: "jewelery"

}
]



jest.mock("../hooks/useFetch");


describe("<Home />", () => {
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
    it("Should render the App and test the title, subtitle, and button of the header component.", async () => {
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
                expect(imageProduto.props.source.uri).toEqual(item.image)



            });
        });


        //exite os textos
        const title = screen.getByText("Mundo das vendas");
        const subTitle = screen.getByText("Seu Aplicativo de vendas!");
        expect(title).toBeTruthy()
        expect(subTitle).toBeTruthy()



        //icone existência e ação
        const imagemComponent = screen.getByTestId('headerIconImage');
        const icontButton = screen.getByTestId('iconTouch');
        expect(imagemComponent).toBeTruthy();
        expect(icontButton).toBeTruthy();

        fireEvent(icontButton, 'press');

        const newBody = await screen.findByText('Itens do carrinho');
        expect(newBody).toBeTruthy();




    });
    it("should render list of the Products", async () => {
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
                expect(imageProduto.props.source.uri).toEqual(item.image)



            });
        });

    });
    it("should render App and show imagem and the tiltes of the categorys ", async () => {
        // testando a aparição dops produtos


       render(
            <App />
        );


        //imagem principal 
        const imagePrincipal = screen.getByTestId("imagePrincipal")
        expect(imagePrincipal).toBeTruthy()


        const textCategoriaMasculina = screen.getByText("Moda Masculina");
        const textCategoriaFeminina = screen.getByText("Moda Feminina");
        const textCategoriaEletronico = screen.getByText("Eletronicos");
        const textCategoriaJoia = screen.getByText("Joias");


        expect(textCategoriaMasculina).toBeTruthy();
        expect(textCategoriaFeminina).toBeTruthy();
        expect(textCategoriaEletronico).toBeTruthy();
        expect(textCategoriaJoia).toBeTruthy();

    });
})