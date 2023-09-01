import { useEffect, useState } from "react";
import "./users.css";
import {
  deleteCommandeById,
  fetchCommandes,
  updateCommandeLivreur,
  updateCommandeStatus,
  updatePaymentStatus,
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
import { FloatButton } from 'antd'
import ThisWeekFilter from "@app/pages/Admin/tables/filtre/ThisWeekFilter";
import ThisMonthFilter from "@app/pages/Admin/tables/filtre/ThisMonthFilter";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { useNavigate } from "react-router-dom";


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
  const [valueOfTheCommandeStatus, setValueOfTheCommandeStatus] = useState<string[]>(['en préparation', 'en attente pickup', 'en dépot', 'en cours de livraison', 'livré', 'annulé']);
  const [valueOfThePaymentStatus, setValueOfThePaymentStatus] = useState<string[]>(['payé', 'nonPayé']);
  const [tableInit, setTableInit] = useState(false);
  const [filterState, setFilterState] = useState(false);

  const navigate = useNavigate();



  const handleUpdateClick = (commandeId: number) => {
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
    await updateCommandeStatus(idCommande, value)
    getAllCommande();
    getAllLivreur();
    //window.location.reload()
  }

  const getAllCommande = async () => {
    const data = await fetchCommandes();
    setCommandes(data);
    setFilteredCommandes(data);
  };
  const getAllLivreur = async () => {
    const data = await fetchAllLivreurs();
    setLivreurs(data);
  };

  const updateStatusPayment = async (
    idCommande: number,
    value: string
  ) => {
    await updatePaymentStatus(idCommande, value)
    getAllCommande();
    getAllLivreur();
  }

  const updateLivreurOfTheCommande = async (livreurId: number, commadeId: number) => {
    console.log("livId : ", livreurId, "cmd ID : ", commadeId)
    await updateCommandeLivreur(livreurId, commadeId)
    getAllCommande();
    getAllLivreur();
  }

  const filterCommandesByDate = (startDate: string, endDate: string) => {
    const filtered = commandes.filter((commande) => {
      if (commande.createdAt >= startDate && commande.createdAt <= endDate) {
        return true;
      }
      return false;
    });
    setFilterState(true)
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
    setFilterState(true)
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
    setFilterState(true)
    setFilteredCommandes(filtered);
  };

  const deleteCommande = (idCommande: number) => {
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
        window.location.reload()
      }
    });
  }

  const handleRetourFilter = () => {
    const getAllCommande = async () => {
      const data = await fetchCommandes();
      setCommandes(data);
      setFilteredCommandes(data);
    };
    setFilterState(false)
    getAllCommande();
  }
  const getLivreurFirstName = (livreurId: number) => {
    const livreur = livreurs.find((livreur) => livreur.idUser === livreurId);
    return livreur ? livreur.firstName + " " + livreur.lastName : "Livreur inconnu";
  };

  const generatePDF = () => {
    const DATA = document.getElementById('htmlData');

    if (DATA) {
      html2canvas(DATA).then((canvas) => {
        const fileWidth = 500; // A4 width in mm
        const fileHeight = 670;
        const FILEURI = canvas.toDataURL('image/png');
        const PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save('FENC-Plateform.pdf');
      });
    } else {
      console.error("Element with id 'htmlData' not found.");
    }
  };

  const redirectToPdfTemplate = (commande:Commande) => {
    
    // You can pass values as query parameters or state, for example:
    
    navigate("/pdfTemplate", { state: { data: commande } });

  };


  return (
    <>
      <ContentHeader title="List Commandes" />
      <div className="container-fluid" >
        <div className="row">
          <div className="col-12">
            {/* /.card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Tous les commandes</h3>
              </div>
              {/* /.card-header */}
              <div className="card-header">
                {filterState && (<div style={{ cursor: "pointer" }} className="d-flex justify-content-start">
                  <div style={{ color: "grey" }} onClick={() => { handleRetourFilter() }}><i className="fas fa-long-arrow-alt-left mr-1"></i>Retourner</div>

                </div>)}
                <div className="row justify-content-start">
                  <div className="col">

                  </div>
                  <div className="col-md-2 col" >
                    <ThisMonthFilter onFilterByThisMonth={handleFilterByThisMonth} />
                  </div>
                  <div className="col-md-2 col" >
                    <ThisWeekFilter onFilterByThisWeek={filterCommandesByThisWeek} />
                  </div>
                  <div className="col-md-4 col text-right">
                    <CommandeFilter
                      onFilter={(startDate, endDate) => filterCommandesByDate(startDate, endDate)}
                    />
                  </div>

                </div>
              </div>
              <div id="pdf-template" style={{ overflow: "auto" }} className="card-body">
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
                                  </span>)
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
                                <button onClick={() => handleUpdateClick(commande.idCommande)} className="btn btn-warning">
                                  <i className="fas fa-pen"></i>
                                </button>
                                <button onClick={() => { redirectToPdfTemplate(commande) }} type="button" className="btn btn-info">
                                  <i className="fas fa-file-alt"></i>
                                </button>
                                <button type="button" className="btn btn-danger" onClick={() => { deleteCommande(commande.idCommande) }}>
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

export default Commandes;