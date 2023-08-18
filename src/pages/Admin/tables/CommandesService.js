import {GET_MY_OWN_COMMANDES,GET_MY_OWN_COMMANDE,GET_COMMANDE_OF_TODAY_BY_STATUS,GET_COMMANDE_BY_ID,CREATE_COMMANDE_URL,GET_ALL_COMMANDES,UPDATE_COMMANDE_BY_ID,DELET_COMMANDE_BY_ID} from '../../../../apiUrls'
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
        window.location.href="/#/commandes"
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

const updateCommandeStatus=async(commandeId,statusValue)=>{
  try {
    const updatedCommande={
      commandeStatus:statusValue
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

const updateDemandeStatus=async(commandeId,statusValue)=>{
  try {
    const updatedCommande={
      demandeStatus:statusValue
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
    toast.success('Demande de payment à été envoyer');
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

const getCommandeById = async (commandeId) => {
  try {
    const response = await fetch(GET_COMMANDE_BY_ID(commandeId));
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch commande');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const getCommandeByIdAuthentificated = async (authentificatedId) => {
  try {
    const response = await fetch(GET_MY_OWN_COMMANDE(authentificatedId));
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch commande');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const getAllMyOwnCommandes = async (authentificatedId) => {
  try {
    const response = await fetch(GET_MY_OWN_COMMANDES(authentificatedId));
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch commande');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const updateCommandeById=async(commandeId,updatedCommande)=>{
  try {
    const response = await fetch(UPDATE_COMMANDE_BY_ID(commandeId), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCommande),
    });
    if (!response.ok) {
      throw new Error('Failed to update user.')
    }
    const data = await response.json()
    toast.success('Commande Modifié Avec Succés')
  } catch (error) {
    toast.error('Failed')
    throw error
  }
}

const getCommandeOfTodayByStatus=async(statusCommande)=>{
  try {
    const response = await fetch(GET_COMMANDE_OF_TODAY_BY_STATUS(statusCommande));
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch commande');
    }
  } catch (error) {
    toast.error('Failed')
  }
}

const getCollisCommandeByUserId=async(idUser)=>{
  try {
    const response = await fetch(GET_COMMANDE_OF_TODAY_BY_STATUS(idUser));
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch commande');
    }
  } catch (error) {
    toast.error('Failed')
  }
}

export {updateDemandeStatus,getAllMyOwnCommandes,getCommandeByIdAuthentificated,updateCommandeStatus,getCommandeOfTodayByStatus,updateCommandeById,getCommandeById,addCommande,fetchCommandes,updateCommandeLivreur,deleteCommandeById}