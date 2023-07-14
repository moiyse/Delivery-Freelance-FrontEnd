import { useEffect, useState } from "react";
import "./users.css";
import { deleteCommandeById, fetchCommandes, getAllMyOwnCommandes, updateCommandeLivreur, updateCommandeStatus } from "../../Admin/tables/CommandesService"
import { ContentHeader } from "@app/components";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import UpdateCommandeLivreur from "./UpdateCommandeClient";
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
interface Livreur {
  idUser:number
  firstName: string;
  lastName: string;
}
const ClientCommandes = () => {
  const [commandes,setCommandes]=useState<Commande[]>([])
  const [selectedCommandeId, setSelectedCommandeId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filteredCommandes, setFilteredCommandes] = useState<Commande[]>([]); // State for filtered commandes
  
  const handleUpdateClick = (commandeId:number) => {
    setSelectedCommandeId(commandeId);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const getAllMyOwnCommande=async()=>{
      const data = await getAllMyOwnCommandes(getCurrentUser().idUser)
      setCommandes(data)
      setFilteredCommandes(data);
    }
    getAllMyOwnCommande()
  }, []);

 
  
  const removeCommande = (commandeId:number) => {
    setFilteredCommandes((prevUsers) => prevUsers.filter((commande) => commande.idCommande !== commandeId));
  };

  return (
    <>
    <ContentHeader title="List De Mes Commandes" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* /.card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Tous Mes commandes</h3>
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
                      <th>Départ</th>
                      <th>Destination</th>
                      <th>Commande Paiement</th>
                      <th>Status Commande</th>
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
                          <td>{commande.depart}</td>
                          <td>{commande.destination}</td>
                          <td className="pill-td">
                            <a>
                              <span className="badge bg-warning">{commande.paymentStatus}</span>
                            </a>
                          </td>
                          <td className="pill-td">
                            <a>
                              <span className="badge bg-warning">{commande.commandeStatus}</span>
                            </a>
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
                      <th>Collis</th>
                      <th>Created At</th>
                      <th>Deliver At</th>
                      <th>Départ</th>
                      <th>Destination</th>
                      <th>Commande Paiement</th>
                      <th>Status Commande</th>
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
          <UpdateCommandeLivreur commandeId={selectedCommandeId} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default ClientCommandes;
