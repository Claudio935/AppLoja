declare global {
  namespace NodeJS {
    type ProcessEnv =  {
      REACT_APP_URL?: string ;
    }
  }
}