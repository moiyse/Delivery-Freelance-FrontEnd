import { useEffect, useState } from "react";
import "../users.css";
import { deleteCommandeById, fetchCommandes, getCommandeOfTodayByStatus, updateCommandeLivreur, updateCommandeStatus, updatePaymentStatus } from "../../tables/CommandesService.js";
import { fetchAllLivreurs, getUserById, updateUserById } from "../UsersService";
import { ContentHeader } from "@app/components";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import UpdateCommande from "../../forms/UpdateCommande";
import jsPDF from "jspdf";
import { template } from "../pdfExport/PdfTamplate";
import Swal from "sweetalert2";
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
const Annulee = () => {
  const [commandes,setCommandes]=useState<Commande[]>([])
  const [livreurs,setLivreurs]=useState<Livreur[]>([])
  const [selectedCommandeId, setSelectedCommandeId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filteredCommandes, setFilteredCommandes] = useState<Commande[]>([]); // State for filtered commandes
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [valueOfTheCommandeStatus, setValueOfTheCommandeStatus] = useState<string[]>(['en préparation','en attente pickup','en dépot','en cours de livraison','livré','annulé']);
  const [valueOfThePaymentStatus, setValueOfThePaymentStatus] = useState<string[]>(['payé','nonPayé']);



  const downloadPDF = (depart:string,dest:string,dateLiv:string,dateCre:string,nomDest:string,phone:string) => {
    const pdf = new jsPDF();
    pdf.html(template(depart,dest,dateLiv,dateCre,nomDest,phone), {
      callback: () => {
        pdf.save('facture.pdf');
      }
    });
  }

  const handleUpdateClick = (commandeId:number) => {
    setSelectedCommandeId(commandeId);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if(filteredCommandes.length != 0)
    {
      const script = document.createElement("script");
      script.src = "js/tableCommande.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Clean up the added script when the component unmounts
        document.body.removeChild(script);
      };
    }
    
  }, [filteredCommandes]);

  const updateStatusPayment = async (
    idCommande: number,
    value: string
  ) => {
    await updatePaymentStatus(idCommande,value)
    getEnCoursCommandeOfToday()
    getAllLivreur()
  }

  const getEnCoursCommandeOfToday=async()=>{
    const data = await getCommandeOfTodayByStatus('en cours de livraison')
    setCommandes(data)
    setFilteredCommandes(data);
  }
  const getAllLivreur=async()=>{
    const data=await fetchAllLivreurs()
    setLivreurs(data)
  }

  useEffect(() => {
    
    getEnCoursCommandeOfToday()
    getAllLivreur()
  }, [currentDate]);

  const updateStatusCommande=async (
    commande: Commande,
    idCommande: number,
    value: string
  ) => {
    if (commande.livreurId) {
      let user = await getUserById(commande.clientId);
      let livreur = await getUserById(commande.clientId);
      if (commande.commandeStatus == "livré") {
        livreur.caisse = livreur.caisse + commande.prixArticle;
      }
      updateUserById(commande.livreurId, livreur);
    }
    await updateCommandeStatus(idCommande,value)
    getEnCoursCommandeOfToday()
    getAllLivreur()
  }
  const updateLivreurOfTheCommande=async(livreurId:number,commadeId:number)=>{
    await updateCommandeLivreur(livreurId,commadeId)
    getEnCoursCommandeOfToday()
    getAllLivreur()
  }
  const removeCommande = (commandeId:number) => {
    setFilteredCommandes((prevUsers) => prevUsers.filter((commande) => commande.idCommande !== commandeId));
  };

  const deleteCommande = (idCommande:number) => {
    Swal.fire({
      title: 'Supprimer Une Commande',
      text: `Etes vous sûr de supprimer la commande avec l'ID : ${idCommande} " ?`,
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Supprimer",
      cancelButtonText: "Retour",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCommandeById(idCommande)
        window.location.reload()
      }
    });
  }

  const getLivreurFirstName = (livreurId:number) => {
    const livreur = livreurs.find((livreur) => livreur.idUser === livreurId);
    return livreur ? livreur.firstName + " " +livreur.lastName : "Unknown Livreur";
  };
  return (
    <>
    <ContentHeader title="List Commandes Annulées" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* /.card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Commandes Annulées</h3>
              </div>
              {/* /.card-header */}
              <div style={{overflow:"auto"}} className="card-body">
                <table
                  id="example1"
                  className="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>Client Id</th>
                      <th>Collis</th>
                      <th>Deliver At</th>
                      <th>Déstinateur</th>
                      <th>Déstination</th>
                      <th>Prix Collis</th>
                      <th>Téléphone Destinateur</th>
                      <th>Status Commande</th>
                      <th>Status Paiement</th>
                      <th>Livreur</th>
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
                      <td className="text-center">Pas de commande</td>
                      <td className="text-center">Pas de commande</td>
                    </tr>
                    ):(
                      filteredCommandes.map((commande)=>{
                        return(
                          <tr>
                            <td>{commande.clientId}</td>
                            <td>
                              <a
                                style={{
                                  textDecoration: "none",
                                  color: "#212529",
                                }}
                                className="dropdown-toggle dropdown-icon"
                                data-toggle="dropdown"
                                aria-expanded="true"
                              >
                                Articles
                              </a>
                              <div className="dropdown-menu dropdown-overflow">
                                {commande.articles
                                  .split("-")
                                  .map((article, index) => (
                                    <a className="dropdown-item" key={index}>
                                      {article}
                                    </a>
                                  ))}
                              </div>
                            </td>
                            <td>{commande.delivredAt}</td>
                            <td>{commande.nomDestinataire + " " + commande.prenomDestinataire}</td>
                            <td>{commande.destination}</td>
                            <td>{commande.prixArticle + " DT"}</td>
                            <td>{commande.phoneDestinataire}</td>
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
                                        commande,
                                        commande.idCommande,
                                        val
                                      );
                                    }}
                                  >
                                    {val}
                                  </a>
                                ))}
                              </div>
                            </td>
                            <td className="pill-td">
                              <a
                                  className="dropdown-toggle dropdown-icon"
                                  data-toggle="dropdown"
                                  aria-expanded="true"
                                >
                                  {commande.paymentStatus != "demandé" ? (
                                  <span className="badge bg-warning">
                                    {commande.paymentStatus}
                                  </span>
                                  ) : (
                                  <span
                                    style={{
                                      color: "white",
                                      fontWeight: "700",
                                      lineHeight: "1",
                                      textAlign: "center",
                                    }}
                                    className="badge blob red"
                                  >
                                    {commande.paymentStatus}
                                  </span>
                                  )}
                              </a>
                              <div className="dropdown-overflow dropdown-menu commande-status-pill">
                                {valueOfThePaymentStatus.map((val) => (
                                  <a
                                    className={
                                      val === commande.paymentStatus
                                        ? "badge bg-warning"
                                        : "dropdown-item"
                                    }
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                    onClick={() => {
                                      updateStatusPayment(
                                        commande.idCommande,
                                        val
                                      );
                                    }}
                                  >
                                    {val}
                                  </a>
                                ))}
                              </div>
                            </td>
                            <td className="pill-td">
                              <a
                                className="dropdown-toggle dropdown-icon"
                                data-toggle="dropdown"
                                aria-expanded="true"
                              >
                                {commande.livreurId
                                  ? (<span className="badge bg-secondary">
                                       {getLivreurFirstName(commande.livreurId)}
                                    </span> )
                                  : (<span
                                    style={{
                                      color: "white",
                                      fontWeight: "700",
                                      lineHeight: "1",
                                      textAlign: "center",
                                    }}
                                    className="badge blob red"
                                    >
                                      No Livreur
                                    </span>)
                                  }
                              </a>
                              <div className="dropdown-overflow dropdown-menu">
                                {livreurs.length === 0 ? (
                                  <a className="dropdown-item">Vide</a>
                                ) : (
                                  livreurs.map((liv) => (
                                    <a
                                      style={{
                                        backgroundColor:
                                          liv.idUser === commande.livreurId
                                            ? "lightblue"
                                            : "",
                                      }}
                                      onClick={() => {
                                        updateLivreurOfTheCommande(
                                          liv.idUser,
                                          commande.idCommande
                                        );
                                      }}
                                      className="dropdown-item"
                                      href=""
                                    >
                                      {liv.idUser === commande.livreurId
                                        ? "selected: " +
                                          liv.firstName +
                                          " " +
                                          liv.lastName
                                        : liv.firstName + " " + liv.lastName}
                                    </a>
                                  ))
                                )}
                              </div>
                            </td>
                          <td>
                            <div className="btn-group">
                              <button  onClick={() => handleUpdateClick(commande.idCommande)} className="btn btn-warning">
                                <i className="fas fa-pen"></i>
                              </button>
                              <button onClick={()=>{downloadPDF(commande.depart,commande.destination,commande.delivredAt,commande.createdAt,commande.nomDestinataire,commande.phoneDestinataire)}} type="button" className="btn btn-info">
                                <i className="fas fa-file-alt"></i>
                              </button>
                              <button type="button" className="btn btn-danger" onClick={()=>{deleteCommande(commande.idCommande)}}>
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
          <UpdateCommande commandeId={selectedCommandeId} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default Annulee;
