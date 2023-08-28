import { useEffect, useState, useRef } from "react";
import { PropsCarrinho } from "../types/interfaces";



  type Fetch = {
    data: PropsCarrinho[],
    loading: Boolean,
    error:Boolean
  }

export const useFetch = (url: string):Fetch  => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<PropsCarrinho[]>([]);
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

     if(url.length>0 && loading ){
      return
     }
   
      const fetchData = async () => {
        try {
         
          const dataPromise = await fetch(url);
          const dataResult = await dataPromise.json();
          
          setData(dataResult);
          
        } catch (error) {
          setError(true);
        }finally {
          setLoading(false);
        }
       
      };
      
  
      fetchData();
      // eslint-disable-next-line
    }, [shouldLoad]);
  
    return { data, loading, error };
  };