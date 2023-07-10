import {removeWindowClass} from '@app/utils/helpers';

export const loginByAuth = async (email: string, password: string) => {
  const token = 'I_AM_THE_TOKEN';
  localStorage.setItem('token', token);
  removeWindowClass('login-page');
  removeWindowClass('hold-transition');
  return token;
};

export const registerByAuth = async (email: string, password: string) => {
  const token = 'I_AM_THE_TOKEN';
  localStorage.setItem('token', token);
  removeWindowClass('register-page');
  removeWindowClass('hold-transition');
  return token;
};


export const getCurrentUser =  () => {
  const authenticationData: any = localStorage.getItem("authentication");
    const authenticationObject = JSON.parse(authenticationData);
    const authenticationToken = authenticationObject.profile.token
    let jwt = authenticationToken
    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)

    return decodedJwtData
} 
