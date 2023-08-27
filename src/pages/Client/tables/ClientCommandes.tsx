import { useEffect, useState } from "react";
import "./users.css";
import { deleteCommandeById, fetchCommandes, getAllMyOwnCommandes, updateCommandeLivreur, updateCommandeStatus, updateDemandeStatus } from "../../Admin/tables/CommandesService"
import { ContentHeader } from "@app/components";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import UpdateCommandeLivreur from "./UpdateCommandeClient";
import { getCurrentUser } from "@app/services/auth";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";

export interface Commande{
  idCommande:number,
  depart:string,
  destination:string,
  paymentStatus:string,
  commandeStatus:string,
  demandeStatus:string,
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
  const [tableInit,setTableInit] = useState(false);
  const [valueOfTheCommandeStatus, setValueOfTheCommandeStatus] = useState<string[]>(['en attente pickup']);



  const handleUpdateClick = (commandeId:number) => {
    setSelectedCommandeId(commandeId);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    getAllMyOwnCommande()
  }, []);


  useEffect(() => {
    if(filteredCommandes.length != 0 && tableInit === false)
    {
      console.log("here")
      const script = document.createElement("script");
      script.src = "js/tableCommande.js";
      script.async = true;
      document.body.appendChild(script);
      setTableInit(true);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [filteredCommandes])


  const getAllMyOwnCommande=async()=>{
    const data = await getAllMyOwnCommandes(getCurrentUser().idUser)
    setCommandes(data)
    setFilteredCommandes(data);
  }

  
  const removeCommande = (commandeId:number) => {
    setFilteredCommandes((prevUsers) => prevUsers.filter((commande) => commande.idCommande !== commandeId));
  };

  const handlePaymentClick =async(commandeId:number) => {
    await updateDemandeStatus(commandeId,"demandé")
    getAllMyOwnCommande()
  }

  const updateStatusCommande = async (
    idCommande: number,
    value: string
  ) => {
    await updateCommandeStatus(idCommande,value)
    getAllMyOwnCommande();
    //window.location.reload()
  }

  const handleAllPaymentClick =async() => {
    let state = false
    if(commandes.length !=0){
      commandes.forEach(async commande => {
        if(commande.commandeStatus == "livré" || commande.commandeStatus == "annulé")
        {
          state = true
          await updateDemandeStatus(commande.idCommande,"demandé")
        }
      })
      state == false ? toast.error("Aucune commande livré ou annulé !") : toast.success("Demande payment envoyé !")
    }
    getAllMyOwnCommande()
  }

  const handleFiltrePayerClick = async () => {
    const data = await getAllMyOwnCommandes(getCurrentUser().idUser)
    let filteredData = data.filter((commande: { paymentStatus: string; }) => commande.paymentStatus == "payé")

    if(filteredData.length <= 0)
    {
      toast.error("Pas de commande Payé")
    }else{
      setFilteredCommandes(filteredData)
      console.log("payer :",filteredData)
    }
    
  }

  const handleFiltreNonPayerClick = async () => {
    const data = await getAllMyOwnCommandes(getCurrentUser().idUser)
    let filteredData = data.filter((commande: { paymentStatus: string; }) => commande.paymentStatus == "nonPayé")
    if(filteredData.length <= 0)
    {
      toast.error("Pas de commande Non Payé")

    }else{
      setFilteredCommandes(filteredData)
      console.log("nonPayer :",filteredData)
    }
    

  }

  const handleFiltreDemanderClick = async () => {
    const data = await getAllMyOwnCommandes(getCurrentUser().idUser)
    let filteredData = data.filter((commande: { paymentStatus: string; }) => commande.paymentStatus == "demandé")

    if(filteredData.length <= 0)
    {
      toast.error("Pas de commande demandé")

    }else{
      setFilteredCommandes(filteredData)
      console.log("demander :",filteredData)
    }
    

  }


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
              <div style={{overflow:"auto"}} className="card-body">
                <div className="mb-4">
                  <button onClick={() => handleAllPaymentClick()} type="button" title="Demande d'être payer" className="btn btn-success">
                  <i className="fas fa-money-bill-wave"></i> Demandé pour être payé 
                  </button>
                  <div className="d-flex align-items-center float-right">
                    <button onClick={() => handleFiltrePayerClick()} type="button" title="payer" className="btn btn-primary float-right mr-2">
                    Payé
                    </button>
                    <button onClick={() => handleFiltreNonPayerClick()} type="button" title="non payer" className="btn btn-primary mr-2">
                    Non payé
                    </button>
                    <button onClick={() => handleFiltreDemanderClick()} type="button" title="demander" className="btn btn-primary mr-2">
                    Demandé 
                    </button>
                  </div>

                </div>
                  
                <table
                  id="commandeTableClient"
                  className="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>Collis</th>
                      <th>Deliver At</th>
                      <th>Déstinateur</th>
                      <th>Déstination</th>
                      <th>Prix Collis</th>
                      <th>Téléphone Destinateur</th>
                      <th>Status Commande</th>
                      <th>Status Paiement</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCommandes.length===0 ? (
                      <tr>
                        <td className="text-center">Pas de commande</td>
                        <td className="text-center">Pas de commande</td>
                        <td className="text-center">Pas de commande</td>
                        <td className="text-center">Pas de commande</td>
                        <td className="text-center">Pas de commande</td>
                        <td className="text-center">Pas de commande</td>
                        <td className="text-center">Pas de commande</td>
                        <td className="text-center">Pas de commande</td>
                        <td className="text-center">Pas de commande</td>
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
                          <td>{commande.nomDestinataire + " " + commande.prenomDestinataire}</td>
                          <td>{commande.destination}</td>
                          <td>{commande.prixArticle +" DT"}</td>
                          <td>{commande.phoneDestinataire}</td>
                          {commande.commandeStatus != "en préparation" ? <td className="pill-td">
                            <a>
                              <span className="badge bg-warning">{commande.commandeStatus}</span>
                            </a>
                          </td>
                          :
                          <td className="pill-td">
                              <a
                                className="dropdown-toggle dropdown-icon"
                                data-toggle="dropdown"
                                aria-expanded="true"
                              >
                                <span className="badge bg-warning">
                                  {commande.commandeStatus}
                                </span>
                              </a>
                              <div className="dropdown-overflow dropdown-menu commande-status-pill">
                                {valueOfTheCommandeStatus.map((val) => (
                                  <a
                                    className={
                                      val === commande.commandeStatus
                                        ? "badge bg-warning"
                                        : "dropdown-item"
                                    }
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                    onClick={() => {
                                      updateStatusCommande(
                                        commande.idCommande,
                                        val
                                      );
                                    }}
                                  >
                                    {val}
                                  </a>
                                ))}
                              </div>
                          </td>}
                          <td className="pill-td">
                            <a>
                              <span className="badge bg-warning">{commande.paymentStatus}</span>
                            </a>
                          </td>
                          
                          <td>
                            <div className="btn-group">
                              <button disabled={commande.commandeStatus != "en préparation"} onClick={() => handleUpdateClick(commande.idCommande)} type="button" className="btn btn-warning">
                                <i className="fas fa-pen"></i>
                              </button>
                              <button disabled={commande.commandeStatus != "en préparation"} type="button" className="btn btn-danger" onClick={()=>{ 
                                                                                                                                              Swal.fire({
                                                                                                                                                title: 'Supprimer Une Commande',
                                                                                                                                                text: `Etes vous sûr de supprimer la commande avec l'ID : ${commande.idCommande} " ?`,
                                                                                                                                                icon: "error",
                                                                                                                                                showCancelButton: true,
                                                                                                                                                confirmButtonText: "Supprimer",
                                                                                                                                                cancelButtonText: "Retour",
                                                                                                                                              }).then((result) => {
                                                                                                                                                if (result.isConfirmed) {
                                                                                                                                                  deleteCommandeById(commande.idCommande)
                                                                                                                                                  removeCommande(commande.idCommande)
                                                                                                                                                  window.location.reload()
                                                                                                                                                }
                                                                                                                                              });
                                                                                                                                              }}>
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
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
