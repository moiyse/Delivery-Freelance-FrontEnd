export const BASE_URL='http://localhost:2000'

export const CREATE_USER_URL=`${BASE_URL}/auth/register`
export const GET_ALL_USERS_URL=`${BASE_URL}/user/getAll`
export const UPDATE_USER_BY_ID = (userId) => `${BASE_URL}/user/${userId}`;
export const DELETE_USER_BY_ID_URL=(userId)=>`${BASE_URL}/user/${userId}`
export const GET_USER_BY_ID_URL=(userId)=>`${BASE_URL}/user/${userId}`
export const GET_ALL_LIVREUR=`${BASE_URL}/user/getAllLivreur`

export const CREATE_COMMANDE_URL=`${BASE_URL}/commande/addCommande`
export const GET_ALL_COMMANDES=`${BASE_URL}/commande/getAll`
export const UPDATE_COMMANDE_BY_ID=(commandeId)=>`${BASE_URL}/commande/${commandeId}`
export const DELET_COMMANDE_BY_ID=(commandeId)=>`${BASE_URL}/commande/${commandeId}`