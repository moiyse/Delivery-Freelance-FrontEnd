import {DELETE_USER_BY_ID_URL} from '../../../../apiUrls.jsx'

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
 
  export{deleteUserById}
  
  
  
  
  