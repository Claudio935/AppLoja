export const mockCart = {
  cart: [{
    title: 'testMasculino',
    image: './img/testMasculino',
    price: 1.5,
    description: 'testandoMasculino',
    id: '1',
    category: "men's clothing",
    quantidade: 1,
  },
  {
    title: 'testFeminino',
    image: './img/testFeminino',
    price: 2,
    description: 'testandoFeminino',
    id: '2',
    category: "women's clothing",
    quantidade: 1,
  },
  {
    title: 'testEletronico',
    image: './img/testEletronico',
    price: 3,
    description: 'testandoEletronico',
    id: '3',
    category: "electronics",
    quantidade: 1,
  },

  {
    title: 'testJoia',
    image: './img/testJoia',
    price: 4,
    description: 'testandoJoia',
    id: '4',
    category: "jewelery",
    quantidade: 1,

  }
  ],
  dispatch: () => null
}

export const mockUseContext = {
  store: {
    cart:
      [
        {
          title: 'testMasculino',
          image: './img/testMasculino',
          price: 1.5,
          description: 'testandoMasculino',
          id: '102',
          category: "men's clothing",
          quantidade: 1,
        },
      ],
  },

  dispatch: jest.fn()
}