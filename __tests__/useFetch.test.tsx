// useFetch.test.js

import useFetch from '../hooks/useFetch';
import { renderHook, waitFor } from '@testing-library/react-native';
import { mockCarrinho } from '../dadosMock/dadosMock';



describe("<App />", () => {
  const originalFetch = global.fetch
  afterEach(() => {
    global.fetch = originalFetch;
  });
  it('fetches data successfully', async () => {

    global.fetch = jest.fn().mockResolvedValue({
      json: async () => mockCarrinho,
    });



    expect.assertions(5)

    // Render the hook
    const { result } = renderHook(() => useFetch('https://fakestoreapi.com/products'));


    expect(result.current.loading).toBe(true);


    await waitFor(() => {

      expect(result.current.loading).toBe(false);


    })
    expect(result.current.data).toEqual(mockCarrinho)
    expect(result.current.error).toBe(false)



  });
  it('fetches data error', async () => {

    global.fetch = jest.fn().mockRejectedValue({
      json: async () => mockCarrinho,
    });



    expect.assertions(5)


    // Render the hook
    const { result } = renderHook(() => useFetch('https://fakestoreapi.com/products'));


    expect(result.current.loading).toBe(true);


    await waitFor(() => {

      expect(result.current.loading).toBe(false);


    })
    expect(result.current.data).toEqual([])
    expect(result.current.error).toBe(true)



  });




})