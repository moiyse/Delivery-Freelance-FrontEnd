import {CREATE_COMMANDE_URL,GET_ALL_COMMANDES,UPDATE_COMMANDE_BY_ID,DELET_COMMANDE_BY_ID} from '../../../../apiUrls'
import { toast } from 'react-toastify';

const addCommande=async(commade)=>{
    try{
        const response = await fetch(CREATE_COMMANDE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(commade)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const resposeData=response.json()
        toast.success('Commande Ajouté avec Succés');
        console.log(resposeData)
      }catch(errorr){
        toast.error('Failed');
        throw(errorr)
      }
}
const fetchCommandes = async () => {
  try {
    const response = await fetch(GET_ALL_COMMANDES); 
    const data = await response.json();
    return data;
  } catch (error) {
    return[]
  }
};

const updateCommandeLivreur=async(livreurId,commandeId)=>{
  try {
    const updatedCommande={
      livreurId:livreurId
    }
    const response = await fetch(UPDATE_COMMANDE_BY_ID(commandeId), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCommande),
    });
    if (!response.ok) {
      throw new Error('Failed to update commande.')
    }
    const data = await response.json()
    toast.success('Commande Modifier avec succés');
  } catch (error) {
    toast.error('!Failed')
    throw error
  }
}

const deleteCommandeById = async (commandeId) => {
  try {
    const response = await fetch(DELET_COMMANDE_BY_ID(commandeId), {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete user.')
    }
    const data = await response.json()
  } catch (error) {
    throw error
  }
};

export {addCommande,fetchCommandes,updateCommandeLivreur,deleteCommandeById}