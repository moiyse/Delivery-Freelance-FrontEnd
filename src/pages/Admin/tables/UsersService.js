import { toast } from 'react-toastify';
import {DELETE_USER_BY_ID_URL,UPDATE_USER_BY_ID,GET_ALL_LIVREUR,GET_USER_BY_ID_URL, CHECK_USER_IF_EXIST, CHANGE_PASSWORD, UPDATE_PASSWORD, SEND_MAIL_FORGET_PASSWORD} from '../../../../apiUrls.jsx'

const deleteUserById = async (userId) => {
    try {
      const response = await fetch(DELETE_USER_BY_ID_URL(userId), {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete user.')
      }
  
      const data = await response.json()
      console.log(data)
    } catch (error) {
      throw error
    }
  };

  const updateUserById=async(userId,updatedUser)=>{
    try {
      const response = await fetch(UPDATE_USER_BY_ID(userId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) {
        throw new Error('Failed to update user.')
      }
      const data = await response.json()
    } catch (error) {
      throw error
    }
  }

  const fetchAllLivreurs = async () => {
    try {
      const response = await fetch(GET_ALL_LIVREUR); 
      const data = await response.json();
      return data;
    } catch (error) {
      return[]
    }
  };

  const getUserById=async(idUser)=>{
    try {
      const response = await fetch(GET_USER_BY_ID_URL(idUser));
      if (response.ok) {
        const user = await response.json();
        return user
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }

  }
  
  const checkUser=async(login)=>{
    try {
      const response = await fetch(CHECK_USER_IF_EXIST(login));
      if (response.ok) {
        const check = await response.json();
        return check
      } else {
        console.log('Error:', response.status);
        toast.error('Oppps')
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const updatePassword = async (userId, newPassword) => {
    try {
      const response = await fetch(UPDATE_PASSWORD(userId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });
  
      if (response.ok) {
        // Password updated successfully
        toast.success('Mot de passe modifier avec succés')
      } else {
        // Handle error
        toast.error('Erreur')
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const sendMailForForgetPassword=async(email,curentUrl,idUser)=>{
    try {
      const response = await fetch(SEND_MAIL_FORGET_PASSWORD(email,curentUrl,idUser));
      if (response.ok) {
        console.log('mail envoyé avec succés')
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }

  }
 
  export{sendMailForForgetPassword,updatePassword,checkUser,deleteUserById,updateUserById,fetchAllLivreurs,getUserById}
  
  
  
  
  