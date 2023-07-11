export const BASE_URL='http://localhost:2000'


/////////////USER//////////////////
export const CREATE_USER_URL=`${BASE_URL}/auth/register`
export const GET_ALL_USERS_URL=`${BASE_URL}/user/getAll`
export const UPDATE_USER_BY_ID = (userId) => `${BASE_URL}/user/${userId}`;
export const DELETE_USER_BY_ID_URL=(userId)=>`${BASE_URL}/user/${userId}`
export const GET_CLIENT_BY_ID = (clientId)=>`${BASE_URL}/user/${clientId}`
export const GET_USER_BY_ID_URL=(userId)=>`${BASE_URL}/user/${userId}`
export const GET_ALL_LIVREUR=`${BASE_URL}/user/getAllLivreur`
export const GET_ALL_CLIENT_WITH_NOT_PAYED_COMMANDS=`${BASE_URL}/user/getAllClientWithNotPayedCommands`

//////////////PaymentExediteur/////////////
export const GET_ALL_PaymentExpediteur=`${BASE_URL}/paymentExpediteur/getAll`
export const Create_PaymentExpediteur=`${BASE_URL}/paymentExpediteur/addPaymentExpediteur`
export const GET_PAYMENTEXPEDITEUR_BY_LIVREURID = (livreurId)=>`${BASE_URL}/paymentExpediteur/getByLivreurId/${livreurId}`



///////////////COMMAND///////////////////
export const UPDATE_CLIENT_COMMANDS_TO_PAYED = (idClient,idPaymentExpediteur)=>`${BASE_URL}/commande/updateClientCommandsToPayed/${idClient}/${idPaymentExpediteur}`
export const CREATE_COMMANDE_URL=`${BASE_URL}/commande/addCommande`
export const GET_ALL_COMMANDES=`${BASE_URL}/commande/getAll`
export const UPDATE_COMMANDE_BY_ID=(commandeId)=>`${BASE_URL}/commande/${commandeId}`
export const DELET_COMMANDE_BY_ID=(commandeId)=>`${BASE_URL}/commande/${commandeId}`
export const GET_COMMANDE_BY_ID=(commandeId)=>`${BASE_URL}/commande/${commandeId}`
export const GET_COMMANDE_OF_TODAY_BY_STATUS=(statusCommande)=>`${BASE_URL}/commande/getByCommandeStatus/${statusCommande}`
export const GET_MY_OWN_COMMANDE=(idAuthentificated)=>`${BASE_URL}/commande/getMyOwnCommande/${idAuthentificated}`
export const GET_MY_OWN_COMMANDES=(idAuthentificated)=>`${BASE_URL}/commande/getAllMyOwnCommande/${idAuthentificated}`

/////////////////Auth//////////////////
export const LOGIN_AUTHENTIFICATION=`${BASE_URL}/auth/login`
export const CHANGE_PASSWORD=`${BASE_URL}/auth/changePassword`