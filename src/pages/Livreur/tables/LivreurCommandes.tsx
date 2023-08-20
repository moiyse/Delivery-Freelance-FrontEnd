import { useEffect, useState } from "react";
import "./users.css";
import { getCommandeByIdAuthentificated, updateCommandeStatus } from "../../Admin/tables/CommandesService.js";
import { ContentHeader } from "@app/components";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import UpdateCommande from "../../Admin/forms/UpdateCommande";
import { getCurrentUser } from "@app/services/auth";
import { User } from "oidc-client-ts";

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
  const [selectedClient, setSelectedClient] = useState<User>();
  const [stateClient, setStateClient] = useState(false);
  const script = document.createElement("script");


  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if(filteredCommandes.length != 0 && !document.body.contains(script))
    {
      script.src = "js/tableCommande.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Clean up the added script when the component unmounts
        document.body.removeChild(script);
      };
    }
  }, [filteredCommandes])

  useEffect(() => {
    
    getMyOwnCommande()
    
  }, [currentDate]);

  useEffect(() => {
    
    setStateClient(true)
    
  }, [selectedClient]);

  const getMyOwnCommande=async()=>{
    const data = await getCommandeByIdAuthentificated(getCurrentUser().idUser)
    setFilteredCommandes(data);
  }

  const updateStatusCommande=async(idCommande:number,value:string)=>{
    await updateCommandeStatus(idCommande,value)
    getMyOwnCommande();
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
              <div style={{overflow:"auto"}} className="card-body">
                {/*<select
                  className="form-control"
                  onChange={(e) => {
                    setDestinationVille(e.target.value);
                    console.log(destinationVille);
                  }}
                >
                  <option disabled selected>Selectionner Ville</option>
                  {ville.map(ville=>(<option value={ville}>{ville}</option>))}
                </select>*/}
                <table
                  id="commandeTableLivreur"
                  className="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>Collis</th>
                      <th>Deliver At</th>
                      <th>Destination</th>
                      <th>Déstinateur</th>
                      <th>Prix Collis</th>
                      <th>Téléphone Destinateur</th>
                      <th>Status Commande</th>
                      <th>Status Paiement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCommandes.length===0 ? (
                      <tr>
                      <td  className="text-center">
                         Aucune commande trouvée.
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
                            <div className="dropdown-overflow dropdown-menu">
                            {commande.articles.split('-').map((article, index) => (
                              <a className="dropdown-item" key={index}>
                                {article}
                              </a>
                            ))}
                            </div>
                          </td>
                          <td>{commande.delivredAt}</td>
                          <td>{commande.destination}</td>
                          <td>{commande.nomDestinataire +" " +commande.prenomDestinataire}</td>
                          <td>{commande.prixArticle + " DT"}</td>
                          <td>{commande.phoneDestinataire}</td>
                          <td className="pill-td">
                            <a className="dropdown-toggle dropdown-icon"
                              data-toggle="dropdown"
                              aria-expanded="true">
                              <span className="badge bg-warning">{commande.commandeStatus}</span>
                            </a>
                            <div className="dropdown-overflow dropdown-menu">
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
