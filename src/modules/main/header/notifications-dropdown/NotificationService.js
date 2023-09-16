import { toast } from "react-toastify";
import { COUNT_NOT_VIEWED_AND_DEMANDE_COMMANDE, COUNT_NOT_VIEWED_AND_NEW_UPDATED_COMMANDE, COUNT_NOT_VIEWED_COMMANDE, UPDATE_ALL_COMMANDE_TO_VIEWED } from "../../../../../apiUrls";

const getNumberOfCommandeNotViewed = async () => {
    try {
      const response = await fetch(COUNT_NOT_VIEWED_COMMANDE);
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

  const getNumberOfCommandeNotViewedAndDemende = async () => {
    try {
      const response = await fetch(COUNT_NOT_VIEWED_AND_DEMANDE_COMMANDE);
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

  const updateCommandsToViewed = async () => {
    try {
      const response = await fetch(UPDATE_ALL_COMMANDE_TO_VIEWED, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log('ok')
    } else {
        console.error('Failed to update commands');
      }
    } catch (error) {
      console.error('Error updating commands:', error);
    }
  };

  const getNumberOfCommandeNewUpdated = async () => {
    try {
      const response = await fetch(COUNT_NOT_VIEWED_AND_NEW_UPDATED_COMMANDE);
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
  export{
    updateCommandsToViewed,
    getNumberOfCommandeNotViewedAndDemende,
    getNumberOfCommandeNotViewed,
    getNumberOfCommandeNewUpdated
  }