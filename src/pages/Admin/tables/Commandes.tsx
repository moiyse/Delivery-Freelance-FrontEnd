import { useEffect, useState } from "react";
import "./users.css";
import {
  deleteCommandeById,
  fetchCommandes,
  updateCommandeLivreur,
  updateCommandeStatus,
} from "../tables/CommandesService.js";
import { fetchAllLivreurs, getUserById, updateUserById } from "./UsersService";
import { ContentHeader } from "@app/components";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import UpdateCommande from "../forms/UpdateCommande";
import CommandeFilter from "@app/pages/Admin/tables/filtre/CommandeFilter";
import {FloatButton} from 'antd'
import ThisWeekFilter from "@app/pages/Admin/tables/filtre/ThisWeekFilter";
import ThisMonthFilter from "@app/pages/Admin/tables/filtre/ThisMonthFilter";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { template } from "./pdfExport/PdfTamplate";
import { startOfMonth, endOfMonth,startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

export interface Commande {
  idCommande: number;
  depart: string;
  destination: string;
  paymentStatus: string;
  commandeStatus: string;
  demandeStatus: string;
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
interface Livreur {
  idUser: number;
  firstName: string;
  lastName: string;
}
const Commandes = () => {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [livreurs, setLivreurs] = useState<Livreur[]>([]);
  const [selectedCommandeId, setSelectedCommandeId] = useState<number | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [filteredCommandes, setFilteredCommandes] = useState<Commande[]>([]); // State for filtered commandes
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [valueOfTheCommandeStatus, setValueOfTheCommandeStatus] = useState<string[]>(['en préparation','en attente pickup','en dépot','en cours de livraison','livré','annulé']);
  const [tableInit,setTableInit] = useState(false);
  
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
    if (filteredCommandes.length != 0 && tableInit === false) {
      const script = document.createElement("script");
      script.src = "js/tableCommande.js";
      script.async = true;
      document.body.appendChild(script);
      setTableInit(true);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [filteredCommandes]);

  useEffect(() => {
    const getAllCommande = async () => {
      const data = await fetchCommandes();
      setCommandes(data);
      setFilteredCommandes(data);
    };
    const getAllLivreur = async () => {
      const data = await fetchAllLivreurs();
      setLivreurs(data);
    };
    getAllCommande();
    getAllLivreur();
  }, [currentDate]);

  const updateStatusCommande = async (
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
    updateCommandeStatus(idCommande,value)
    window.location.reload()
  }

  const updateLivreurOfTheCommande=async(livreurId:number,commadeId:number)=>{
      updateCommandeLivreur(livreurId,commadeId)
      window.location.reload()
  }

  const filterCommandesByDate = (startDate: string, endDate: string) => {
    const filtered = commandes.filter((commande) => {
      if (commande.createdAt >= startDate && commande.createdAt <= endDate) {
        return true;
      }
      return false;
    });
    setFilteredCommandes(filtered);
  };

  const filterCommandesByThisWeek = () => {
    const currentDate = new Date();
    const start = startOfWeek(currentDate);
    const end = endOfWeek(currentDate);
    const filtered = commandes.filter((commande) => {
      const commandeDate = new Date(commande.createdAt);
      return isWithinInterval(commandeDate, { start, end });
    });
    setFilteredCommandes(filtered);
  };

  const handleFilterByThisMonth = () => {
    const currentDate = new Date();
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const filtered = commandes.filter((commande) => {
      const commandeDate = new Date(commande.createdAt);
      return isWithinInterval(commandeDate, { start, end });
    });
    setFilteredCommandes(filtered);
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
        setFilteredCommandes((prevUsers) => prevUsers.filter((commande) => commande.idCommande !== idCommande));
      }
    });
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
                <h3 className="card-title">Tous les commandes</h3>
              </div>
              {/* /.card-header */}
              <div className="card-header">
                  <div className="d-flex justify-content-end">
                      <div style={{marginRight:20}}>
                        <ThisMonthFilter onFilterByThisMonth={handleFilterByThisMonth}/>
                      </div>
                      <div style={{marginRight:20}}>
                        <ThisWeekFilter onFilterByThisWeek={filterCommandesByThisWeek} />
                      </div>
                     <CommandeFilter
                        onFilter={(startDate, endDate) => filterCommandesByDate(startDate, endDate)}
                      />  
                  </div>
              </div>
              <div id="pdf-template" className="card-body">
                <table
                  id="example1"
                  className="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>Client Id</th>
                      <th>Collis</th>
                      <th>Created At</th>
                      <th>Deliver At</th>
                      <th>Destination</th>
                      <th>Status Commande</th>
                      <th>Status Payment</th>
                      <th>Status Demande</th>
                      <th>Livreur</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCommandes.length === 0 ? (
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
                      </tr>
                    ) : (
                      filteredCommandes.map((commande) => {
                        return (
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
                            <td>{commande.createdAt}</td>
                            <td>{commande.delivredAt}</td>
                            <td>{commande.destination}</td>
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
                                    href="#"
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
                              <a>
                                {
                                  <span className="badge bg-warning">
                                    {commande.paymentStatus}
                                  </span>
                                }
                              </a>
                            </td>
                            <td className="pill-td">
                              <a>
                                {commande.demandeStatus === "neutre" ? (
                                  <span className="badge bg-secondary">
                                    {commande.demandeStatus}
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
                                    {commande.demandeStatus}
                                  </span>
                                )}
                              </a>
                            </td>
                            <td>
                              <a
                                style={{
                                  textDecoration: "none",
                                  color: commande.livreurId ? "black" : "red",
                                }}
                                className="dropdown-toggle dropdown-icon"
                                data-toggle="dropdown"
                                aria-expanded="true"
                              >
                                {commande.livreurId
                                  ? "Voir Livreur"
                                  : "No Livreur"}
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
                                      href="#"
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
                              <button onClick={() => handleUpdateClick(commande.idCommande)} type="button" className="btn btn-warning">
                                <i className="fas fa-pen"></i>
                              </button>
                              <button type="button" className="btn btn-danger" onClick={()=>{deleteCommande(commande.idCommande)}}>
                                <i className="fa fa-trash"></i>
                              </button>
                              <button onClick={()=>{downloadPDF(commande.depart,commande.destination,commande.delivredAt,commande.createdAt,commande.nomDestinataire,commande.phoneDestinataire)}} type="button" className="btn btn-warning">
                                PDF
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

export default Commandes;
