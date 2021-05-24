export const environment = {
  production: false,
  apiUrl:'https://stage.drelichlaw.com/api/'
};

export const envMethods  = {
  apiUrlCall: (url:string) =>{
    return environment.apiUrl+url;
  }
};