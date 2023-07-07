import {DELETE_USER_BY_ID_URL,UPDATE_USER_BY_ID,GET_ALL_LIVREUR,GET_USER_BY_ID_URL} from '../../../../apiUrls.jsx'

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
      console.log(data)
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
  
 
  export{deleteUserById,updateUserById,fetchAllLivreurs,getUserById}
  
  
  
  
  