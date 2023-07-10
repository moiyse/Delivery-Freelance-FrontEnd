import { UserManager, UserManagerSettings } from 'oidc-client-ts';
import { sleep } from './helpers';
import axios from 'axios';
import { LOGIN_AUTHENTIFICATION } from '../../apiUrls';

declare const FB: any;

const GOOGLE_CONFIG: UserManagerSettings = {
  authority: 'https://accounts.google.com',
  client_id:
    '533830427279-cspigijdu0g50c7imca5pvdbrcn2buaq.apps.googleusercontent.com',
  client_secret: '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',
  redirect_uri: `${window.location.protocol}//${window.location.host}/callback`,
  scope: 'openid email profile',
  loadUserInfo: true,
};



export const authLogin = (email: any, password: string) => {
  let data : any
  const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    console.log("formData",formData)
  return new Promise(async (res, rej) => {
    await sleep(500);
    await axios
      .post(LOGIN_AUTHENTIFICATION,formData,{
        headers: {
          "Content-Type": "application/json",
        },})
      .then((res) => {
        data = res.data;
        console.log("token from login : ", data);
      })
      .catch((error) => {
        console.log(error);
      });
      console.log("here 1")
    if(data){
      console.log("here 2")
      localStorage.setItem(
        'authentication',
        JSON.stringify({ profile: { email: data.email,token:data.token } })
      );
      return res({ profile: { email: data.email,token:data.token } });
    }

    else
    {
      console.log("wrong")
      return rej({ message: 'Credentials are wrongggg!' });
    }

    /*if (email === 'admin@admin.com' && password === 'admin') {
      console.log("admin")
      localStorage.setItem(
        'authentication',
        JSON.stringify({ profile: { email: 'admin@admin.com',role:"admin" } })
      );
      return res({ profile: { email: 'admin@example.com',role:"admin" } });
    }
    else if (email === 'client@client.com' && password === 'client') {
      localStorage.setItem(
        'authentication',
        JSON.stringify({ profile: { email: 'client@client.com',role:"client" } })
      );
      return res({ profile: { email: 'client@client.com',role:"client" } });
    }
    else if (email === 'livreur@livreur.com' && password === 'livreur') {
      localStorage.setItem(
        'authentication',
        JSON.stringify({ profile: { email: 'livreur@livreur.com',role:"livreur" } })
      );
      return res({ profile: { email: 'livreur@livreur.com',role:"livreur" } });
    }
    else if (email === 'superAdmin@superAdmin.com' && password === 'superAdmin') {
      localStorage.setItem(
        'authentication',
        JSON.stringify({ profile: { email: 'superAdmin@superAdmin.com',role:"superAdmin" } })
      );
      return res({ profile: { email: 'superAdmin@superAdmin.com',role:"superAdmin" } });
    }*/
    
    
    
  });
};

export const getAuthStatus = () => {
  return new Promise(async (res, rej) => {
    await sleep(1000);
    try {
      let authentication = localStorage.getItem('authentication');
      if (authentication) {
        authentication = JSON.parse(authentication);
        return res(authentication);
      }
      return res(undefined);
    } catch (error) {
      return res(undefined);
    }
  });
};
