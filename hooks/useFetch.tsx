import { useEffect, useState, useRef } from "react";


  type Produto = {
    id: string,
    title:string,
    price:string,
    category:string,
    description:string,
    image:string
  }
  type Fetch = {
    data: Produto[],
    loading: Boolean,
    error:Boolean
  }

export const useFetch = (url: string):Fetch  => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Produto[]>([]);
    const [error, setError] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const urlRef = useRef(url);
  
    
    useEffect(() => {
      if (url !== urlRef.current) {
        urlRef.current = url;
        setShouldLoad((s) => !s);
      }
    }, [url]);
    useEffect(() => {
      if (url.length === 0) {
        return;
      }
      if (loading) {
        return;
      }
  
     
      const fetchData = async () => {
        try {
          setLoading(true);
          const dataPromise = await fetch(url);
          const dataResult = await dataPromise.json();
          
          setData(dataResult);
          setLoading(false);
        } catch (error) {
          console.error("Ocorreu um erro:", error);
          setError(true);
        }
        setLoading(false);
      };
  
      fetchData();
      // eslint-disable-next-line
    }, [shouldLoad]);
  
    return { data, loading, error };
  };