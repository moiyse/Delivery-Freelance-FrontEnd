import { useEffect, useState } from "react";
import "../users.css";
import { deleteCommandeById, fetchCommandes, getCommandeOfTodayByStatus, updateCommandeLivreur, updateCommandeStatus } from "../../tables/CommandesService.js";
import { fetchAllLivreurs } from "../UsersService";
import { ContentHeader } from "@app/components";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import UpdateCommande from "../../forms/UpdateCommande";
import CommandeFilter from "@app/pages/Admin/tables/filtre/CommandeFilter";
import ThisDayFilter from "@app/pages/Admin/tables/filtre/ThisDayFilter";
import NextWeekFilter from "@app/pages/Admin/tables/filtre/NextWeekFilter";
export interface Commande{
  idCommande:number,
  depart:string,
  destination:string,
  paymentStatus:string,
  commandeStatus:string,
  createdAt:string,
  delivredAt:string,
  nomDestinataire:string,
  prenomDestinataire:string,
  phoneDestinataire:string,
  prixArticle:string,
  articles:string,
  livreurId:number
  clientId:number
}
interface Livreur {
  idUser:number
  firstName: string;
  lastName: string;
}
const EnCours = () => {
  const [commandes,setCommandes]=useState<Commande[]>([])
  const [livreurs,setLivreurs]=useState<Livreur[]>([])
  const [selectedCommandeId, setSelectedCommandeId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filteredCommandes, setFilteredCommandes] = useState<Commande[]>([]); // State for filtered commandes
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [valueOfTheCommandeStatus, setValueOfTheCommandeStatus] = useState<string[]>(['en préparation','en attente pickup','en dépot','en cours de livraison','livré','annulé']);

  const handleUpdateClick = (commandeId:number) => {
    setSelectedCommandeId(commandeId);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const getEnCoursCommandeOfToday=async()=>{
        const data = await getCommandeOfTodayByStatus('en cours de livraison')
        setCommandes(data)
        setFilteredCommandes(data);
      }
    const getAllLivreur=async()=>{
      const data=await fetchAllLivreurs()
      setLivreurs(data)
    }
    getEnCoursCommandeOfToday()
    getAllLivreur()
  }, [currentDate]);
  const updateStatusCommande=async(idCommande:number,value:string)=>{
    updateCommandeStatus(idCommande,value)
    window.location.reload()
  }
  const updateLivreurOfTheCommande=async(livreurId:number,commadeId:number)=>{
      updateCommandeLivreur(livreurId,commadeId)
      window.location.reload()
  }
  const removeCommande = (commandeId:number) => {
    setFilteredCommandes((prevUsers) => prevUsers.filter((commande) => commande.idCommande !== commandeId));
  };
  return (
    <>
    <ContentHeader title="List Commandes En Cours De Livraison" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* /.card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Commandes En Cours</h3>
              </div>
              {/* /.card-header */}
              <div className="card-body">
                <table
                  id="example1"
                  className="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Collis</th>
                      <th>Created At</th>
                      <th>Deliver At</th>
                      <th>Destination</th>
                      <th>Commande Status</th>
                      <th>Livreur</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCommandes.length===0 ? (
                      <tr>
                      <td  className="text-center">
                        No commands found.
                      </td>
                    </tr>
                    ):(
                      filteredCommandes.map((commande)=>{
                        return(
                          <tr>
                          <td>
                            clientId
                          </td>
                          <td>
                            <a
                              style={{ textDecoration: "none",color: "#212529" }}
                              className="dropdown-toggle dropdown-icon"
                              data-toggle="dropdown"
                              aria-expanded="true"
                            >
                              Articles
                            </a>
                            <div className="dropdown-menu">
                            {commande.articles.split('-').map((article, index) => (
                              <a className="dropdown-item" key={index}>
                                {article}
                              </a>
                            ))}
                            </div>
                          </td>
                          <td>{commande.createdAt}</td>
                          <td>{commande.delivredAt}</td>
                          <td>{commande.destination}</td>
                          <td className="pill-td">
                            <a className="dropdown-toggle dropdown-icon"
                              data-toggle="dropdown"
                              aria-expanded="true">
                              <span className="badge bg-warning">{commande.commandeStatus}</span>
                            </a>
                            <div className="dropdown-menu">
                                  {valueOfTheCommandeStatus.map((val)=>(
                                    <a className={val===commande.commandeStatus? 'badge bg-warning' : 'dropdown-item'} 
                                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} href="#"
                                      onClick={()=>{updateStatusCommande(commande.idCommande,val)}}>
                                      {val}
                                    </a>
                                  ))
                                  }           
                            </div>
                          </td>
                          <td>
                            <a
                              style={{ textDecoration: "none",color: commande.livreurId ? "black" : "red" }}
                              className="dropdown-toggle dropdown-icon"
                              data-toggle="dropdown"
                              aria-expanded="true"
                            >
                              {commande.livreurId ? "Voir Livreur": "No Livreur"}
                            </a>
                            <div className="dropdown-menu">
                              
                                {livreurs.length===0 ?(
                                  <a className="dropdown-item">Vide</a>
                                ):(
                                  livreurs.map((liv)=>(
                                    <a  style={{ backgroundColor: liv.idUser === commande.livreurId ? 'red' : '' }}
                                        onClick={()=>{updateLivreurOfTheCommande(liv.idUser,commande.idCommande)}} className="dropdown-item" href="#">
                                      {liv.firstName}
                                    </a>
                                  ))
                                )}
                              
                            </div>
                          </td>
                          <td>
                            <div className="btn-group">
                              <button onClick={() => handleUpdateClick(commande.idCommande)} type="button" className="btn btn-warning">
                                <i className="fas fa-pen"></i>
                              </button>
                              <button type="button" className="btn btn-danger" onClick={()=>{deleteCommandeById(commande.idCommande);removeCommande(commande.idCommande)}}>
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        )
                      })
                    )}

                    
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Client</th>
                      <th>Collis</th>
                      <th>Created At</th>
                      <th>Deliver At</th>
                      <th>Destination</th>
                      <th>Commande Status</th>
                      <th>Livreur</th>
                      <th>Actions</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
      </div>
      {/* /.container-fluid */}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Commande</DialogTitle>
        <DialogContent>
          <UpdateCommande commandeId={selectedCommandeId} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default EnCours;
