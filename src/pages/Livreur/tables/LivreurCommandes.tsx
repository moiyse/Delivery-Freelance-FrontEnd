import { useEffect, useState } from "react";
import "./users.css";
import { getCommandeByIdAuthentificated, updateCommandeStatus } from "../../Admin/tables/CommandesService.js";
import { ContentHeader } from "@app/components";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import UpdateCommande from "../../Admin/forms/UpdateCommande";
import { getCurrentUser } from "@app/services/auth";

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

const LivreurCommandes  = () => {
  const [selectedCommandeId, setSelectedCommandeId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filteredCommandes, setFilteredCommandes] = useState<Commande[]>([]); // State for filtered commandes
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [valueOfTheCommandeStatus, setValueOfTheCommandeStatus] = useState<string[]>(['en préparation','en attente pickup','en dépot','en cours de livraison','livré','annulé']);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const getMyOwnCommande=async()=>{
      const data = await getCommandeByIdAuthentificated(getCurrentUser().idUser)
      setFilteredCommandes(data);
    }
    getMyOwnCommande()
    
  }, [currentDate]);

  const updateStatusCommande=async(idCommande:number,value:string)=>{
    updateCommandeStatus(idCommande,value)
    window.location.reload()
  }
  return (
    <>
    <ContentHeader title="List Commandes" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* /.card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Tous Les Commandes D'aujourd'hui</h3>
              </div>
              {/* /.card-header */}
              <div className="card-body">
                <table
                  id="example1"
                  className="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>Collis</th>
                      <th>Created At</th>
                      <th>Deliver At</th>
                      <th>Destination</th>
                      <th>Nom Distinataire</th>
                      <th>Phone Distinataire</th>
                      <th>Status Commande</th>
                      <th>Paiement Status</th>
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
                          <td>{commande.nomDestinataire} {commande.prenomDestinataire}</td>
                          <td>{commande.phoneDestinataire}</td>
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
                          <td className="pill-td">
                            <a>
                              <span className="badge bg-warning">{commande.paymentStatus}</span>
                            </a>
                          </td>  
                        </tr>
                        )
                      })
                    )}

                    
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Collis</th>
                      <th>Created At</th>
                      <th>Deliver At</th>
                      <th>Destination</th>
                      <th>Nom Distinataire</th>
                      <th>Phone Distinataire</th>
                      <th>Status Commande</th>
                      <th>Paiement Status</th>
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

export default LivreurCommandes ;
