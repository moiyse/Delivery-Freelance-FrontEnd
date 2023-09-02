import {SmallBox} from '@app/components';
import React, { useEffect, useState } from 'react';
import {ContentHeader} from '@components';
import { fetchAllClients } from '../Admin/tables/UsersService';
import { fetchCommandes, getAllMyOwnCommandes } from '../Admin/tables/CommandesService';
import { getCurrentUser } from '@app/services/auth';

export interface Commande {
  idCommande: number;
  depart: string;
  departVille:string;
  departCite:string;
  destination: string;
  destinationVille:string;
  destinationCite:string;
  paymentStatus: string;
  commandeStatus: string;
  commandeType:string;
  createdAt: string;
  delivredAt: string;
  nomDestinataire: string;
  prenomDestinataire: string;
  phoneDestinataire: string;
  articles: string;
  livreurId: number;
  clientId: number;
  prixArticle: number;
}

interface  Client {
  idUser: number;
  firstName: string;
  lastName: string;
}

const ClientDashboard = () => {

  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [commandesThisWeek, setCommandesThisWeek] = useState(0);
  const [commandesThisMonth, setCommandesThisMonth] = useState(0);
  const [nombreClients, setNombreClients] = useState(0);
  const currentDate = new Date()
  const formattedCurrentDate = currentDate.toISOString().split('T')[0]; // Format as yyyy-MM-dd

  const getStartOfWeek = (date: Date, startDay: number) => {
    const day = date.getDay();
    const diff = (day - startDay + 7) % 7;
    date.setDate(date.getDate() - diff);
    date.setHours(0, 0, 0, 0);
    return date;
  };


  useEffect(() => {
    getAllMyOwnCommande()
  }, [])

  useEffect(() => {
    getCommandesThisWeek()
    getCommandesThisMonth()
  }, [commandes])

  const getAllMyOwnCommande=async()=>{
    const data = await getAllMyOwnCommandes(getCurrentUser().idUser)
    setCommandes(data)
  }

  const getAllClients = async() => {
    const data = await fetchAllClients();
    setClients(data)
  }

  const getCommandesThisWeek = () => {
    console.log("commandes: ", commandes);

    // Calculate the start date of the current week
    const startDate = getStartOfWeek(currentDate, 0); // Use 0 for Sunday, or 1 for Monday, adjust accordingly

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7); // Go to the end of the week (next Sunday)

    console.log("startOfWeek:", startDate);
    console.log("endOfWeek:", endDate);

    // Filter commandes created within the current week
    const commandesThisWeek = commandes.filter((commande: Commande) => {
      const createdAtDate = new Date(commande.createdAt);
      return (
        createdAtDate >= startDate && createdAtDate < endDate
      ); 
    });

    // Now, commandesThisWeek contains the commandes created this week
    console.log(commandesThisWeek);
    setCommandesThisWeek(commandesThisWeek.length)
  };

  const getCommandesThisMonth = async () => {
    console.log("commandes: ", commandes);
  
    // Calculate the start date of the current month
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  
    // Calculate the end date of the current month by going to the next month and subtracting one day
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
    console.log("startOfMonth:", startDate);
    console.log("endOfMonth:", endDate);
  
    // Filter commandes created within the current month
    const commandesThisMonth = commandes.filter((commande: Commande) => {
      const createdAtDate = new Date(commande.createdAt);
      return createdAtDate >= startDate && createdAtDate <= endDate;
    });
  
    // Now, commandesThisMonth contains the commandes created this month
    console.log(commandesThisMonth);
    setCommandesThisMonth(commandesThisMonth.length)
  };


  const getAllUserClients = () => {
    getAllClients()
    setNombreClients(clients.length)
  }
  

  return (
    <div>
      <ContentHeader title="Dashboard" />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className='col-lg'>

            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{commandes.length}</h3>

                  <p>Mes Commandes</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>
                    {commandesThisWeek}
                  </h3>

                  <p>Mes Commandes Cette Semaine</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{commandesThisMonth}</h3>

                  <p>Mes commandes ce mois</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
              </div>
            </div>
            <div className='col-lg'>

            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientDashboard;
