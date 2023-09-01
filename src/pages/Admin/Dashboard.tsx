import { SmallBox } from '@app/components';
import React, { useEffect, useState } from 'react';
import { ContentHeader } from '@components';
import { fetchCommandes, getAllMyOwnCommandes } from './tables/CommandesService';
import { fetchAllClients } from './tables/UsersService';

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

interface Client {
  idUser: number;
  firstName: string;
  lastName: string;
}

const Dashboard = () => {

  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [clientCommandes, setClientCommandes] = useState<Commande[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [commandesThisWeek, setCommandesThisWeek] = useState(0);
  const [commandesClientThisWeek, setCommandesClientThisWeek] = useState(0);
  const [commandesClientThisMonth, setCommandesClientThisMonth] = useState(0);
  const [commandesThisMonth, setCommandesThisMonth] = useState(0);
  const [nombreClients, setNombreClients] = useState(0);
  const [selectedClientId, setSelectedClientId] = useState("");
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
    getAllCommandes()
    getAllClients()
  }, [])

  useEffect(() => {
    getCommandesThisWeek()
    getCommandesThisMonth()
    getAllUserClients()
  }, [commandes])

  useEffect(() => {
    getAllUserClients()
  }, [clients])

  const getAllCommandes = async () => {
    const data = await fetchCommandes();
    setCommandes(data)
  }

  const getAllClients = async () => {
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



  /////// Client ////////////

  const getClientCommandesThisWeek = (inputClientCommandes:Commande[]) => {
    console.log("commandes: ", inputClientCommandes);

    // Calculate the start date of the current week
    const startDate = getStartOfWeek(currentDate, 0); // Use 0 for Sunday, or 1 for Monday, adjust accordingly

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7); // Go to the end of the week (next Sunday)

    console.log("startOfWeek:", startDate);
    console.log("endOfWeek:", endDate);

    // Filter commandes created within the current week
    const commandesThisWeek = inputClientCommandes.filter((commande: Commande) => {
      const createdAtDate = new Date(commande.createdAt);
      return (
        createdAtDate >= startDate && createdAtDate < endDate
      );
    });

    // Now, commandesThisWeek contains the commandes created this week
    console.log(commandesThisWeek);
    setCommandesClientThisWeek(commandesThisWeek.length)
    return commandesThisWeek.length
  };

  const getClientCommandesThisMonth = async (inputClientCommandes:Commande[]) => {
    console.log("commandes: ", inputClientCommandes);

    // Calculate the start date of the current month
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Calculate the end date of the current month by going to the next month and subtracting one day
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    console.log("startOfMonth:", startDate);
    console.log("endOfMonth:", endDate);

    // Filter commandes created within the current month
    const commandesThisMonth = inputClientCommandes.filter((commande: Commande) => {
      const createdAtDate = new Date(commande.createdAt);
      return createdAtDate >= startDate && createdAtDate <= endDate;
    });

    // Now, commandesThisMonth contains the commandes created this month
    console.log(commandesThisMonth);
    setCommandesClientThisMonth(commandesThisMonth.length)
    return commandesThisMonth.length
  };


  const getAllUserClients = () => {
    getAllClients()
    setNombreClients(clients.length)
  }

  const handleSelectedClient = async (idClient:string) => {
    console.log(idClient)
    const data = await getAllMyOwnCommandes(idClient);
    console.log("commandes of client : ",clientCommandes)
    setClientCommandes(data)
    getClientCommandesThisWeek(data)
    getClientCommandesThisMonth(data)
    
    setSelectedClientId(idClient)
  }


  return (
    <div>
      <ContentHeader title="Dashboard" />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{commandes.length}</h3>

                  <p>Les Commandes</p>
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

                  <p>Les Commandes Cette Semaine</p>
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

                  <p>Les commandes ce mois</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{nombreClients}</h3>

                  <p>Les Clients</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
              </div>
            </div>
          </div>
          <div style={{width:"40%"}} className='mb-4'>
            <select
              className="form-control"
              onChange={(e) => {
                handleSelectedClient(e.target.value);
                //console.log(client);
              }}
            >
              <option disabled selected>Selectionner Client</option>
              {clients.map(client => <option value={client.idUser}>{client.firstName + " " + client.lastName}</option>)}
            </select>
          </div>
          {selectedClientId != "" && <div className="row">
            <div className='col-lg'>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{clientCommandes.length}</h3>

                  <p>Les Commandes de Client</p>
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
                    {commandesClientThisWeek}
                  </h3>

                  <p>Les Commandes de Client Cette Semaine </p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{commandesClientThisMonth}</h3>

                  <p>Les commandes de Client ce mois</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
              </div>
            </div>
            <div className='col-lg'>
            </div>
            
          </div>}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
