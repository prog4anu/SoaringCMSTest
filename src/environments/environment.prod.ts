export const environment = {
  production: true,
  apiUrl:'https://stage.drelichlaw.com/api/'
};

export const envMethods  = {
  apiUrlCall: (url:string) =>{
    return environment.apiUrl+url;
  }
};