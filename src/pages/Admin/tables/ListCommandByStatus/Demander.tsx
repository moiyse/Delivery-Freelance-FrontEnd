import { useEffect, useState } from "react";
import "../users.css";
import { deleteCommandeById, fetchCommandes, getCommandeOfTodayByStatus, updateCommandeLivreur, updateCommandeStatus, updatePaymentStatus } from "../../tables/CommandesService.js";
import { fetchAllClients, fetchAllLivreurs, getUserById, updateUserById } from "../UsersService";
import { ContentHeader } from "@app/components";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import UpdateCommande from "../../forms/UpdateCommande";
import jsPDF from "jspdf";
//import { template } from "../pdfExport/PdfTamplate";
import Swal from "sweetalert2";
import ClientCommandes from "@app/pages/Client/tables/ClientCommandes";
import { useNavigate } from "react-router-dom";
import { useNotification } from "@app/modules/main/header/notifications-dropdown/NotificationContext";

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
  idUser: number
  firstName: string;
  lastName: string;
}
type User = {
  idUser: number;
  firstName: string;
  lastName: String;
  email: string;
  phone: string;
  role: string;
  retour: number;
  livraison: number;
  caisse: number
  status: string;
  createdAt: string;
};

const Demander = () => {
  const [commandes, setCommandes] = useState<Commande[]>([])
  const [livreurs, setLivreurs] = useState<Livreur[]>([])
  const [clients, setClients] = useState<User[]>([])
  const [clientsData, setClientsData] = useState<any[]>([])
  const [selectedCommandeId, setSelectedCommandeId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filteredCommandes, setFilteredCommandes] = useState<Commande[]>([]); // State for filtered commandes
  const [clientCommandesDemander, setClientCommandesDemander] = useState<Commande[]>([]); // State for filtered commandes
  const [CommandesClient, setCommandesClient] = useState<Commande[]>([]); // State for filtered commandes
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [valueOfTheCommandeStatus, setValueOfTheCommandeStatus] = useState<string[]>(['en préparation','en attente pickup','en dépot','reporté','en cours de livraison','livré','annulé']);
  const [valueOfThePaymentStatus, setValueOfThePaymentStatus] = useState<string[]>(['payé','nonPayé']);

  const navigate = useNavigate();
  const { addNotification } = useNotification();


  const downloadPDF = (depart: string, dest: string, dateLiv: string, dateCre: string, nomDest: string, phone: string) => {
    const pdf = new jsPDF();
    /*pdf.html(template(depart, dest, dateLiv, dateCre, nomDest, phone), {
      callback: () => {
        pdf.save('facture.pdf');
      }
    });*/
  }

  const handleUpdateClick = (commandeId: number) => {
    setSelectedCommandeId(commandeId);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    getAllClient()

  }, []);

  useEffect(() => {
    getClientData()

  }, [clientCommandesDemander]);

  useEffect(() => {
    if (filteredCommandes.length != 0) {
      const script = document.createElement("script");
      script.src = "js/tableCommande.js";
      script.async = true;
      document.body.appendChild(script);

      

      ///////////////

      const uniqueIdUsers = new Set();

      const result = filteredCommandes.filter((commande) => {
          if (!uniqueIdUsers.has(commande.clientId)) {
              uniqueIdUsers.add(commande.clientId);
              return true;
          }
          return false;
      }); 

      console.log("commandes : ",result)
      setClientCommandesDemander(result)

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
    addNotification({
      message: 'New command added!',
      type: 'success',
    });
    await updatePaymentStatus(idCommande, value)
    getCommandesDemander()
    getAllLivreur()

  }

  const getCommandesDemander = async () => {
    const data = await fetchCommandes();
    setFilteredCommandes(data.filter((commande: { paymentStatus: string; }) => commande.paymentStatus == "demandé"))
    
    
  }

  const getClientData = ()=> {
    const clientData = clientCommandesDemander.map((commande) => {
      const clientId = commande.clientId;
      const firstName = getClientFirstName(clientId);
      const commandesCount = getCommandesClientDemander(clientId);
    
      return { clientId, firstName, commandesCount };
    });
    setClientsData(clientData)
  } 

  const getCommandesClientDemander = (clientId: number) => {
    const data = filteredCommandes.filter((commande => commande.clientId == clientId))
    setCommandesClient(data)
    
    return data.length
  }

  const getAllLivreur = async () => {
    const data = await fetchAllLivreurs()
    setLivreurs(data)
  }

  const getAllClient = async () => {
    const data = await fetchAllClients()
    setClients(data)
  }

  useEffect(() => {
    getCommandesDemander()
    getAllLivreur()
    getAllClient()
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
    addNotification({
      message: 'New command added!',
      type: 'success',
    });
    await updateCommandeStatus(idCommande, value)
    getCommandesDemander()
    getAllLivreur()
  }
  const updateLivreurOfTheCommande = async (livreurId: number, commadeId: number) => {
    addNotification({
      message: 'New command added!',
      type: 'success',
    });
    await updateCommandeLivreur(livreurId, commadeId)
    getCommandesDemander()
    getAllLivreur()
  }
  const removeCommande = (commandeId: number) => {
    setFilteredCommandes((prevUsers) => prevUsers.filter((commande) => commande.idCommande !== commandeId));
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
        window.location.reload()
      }
    });
  }

  const redirectToPdfTemplate = (commande:Commande) => {
    
    // You can pass values as query parameters or state, for example:
    
    navigate("/pdfTemplate", { state: { data: commande } });

  };

  const getLivreurFirstName = (livreurId: number) => {
    const livreur = livreurs.find((livreur) => livreur.idUser === livreurId);
    return livreur ? livreur.firstName + " " + livreur.lastName : "Unknown Livreur";
  };

  const getClientFirstName = (clientId: number) => {
    const client = clients.find((client) => client.idUser === clientId);
    const result = client ? client.firstName + " " + client.lastName : "Client inconnu";
    return result
  };

  const openModal = (commande: Commande) => {
    getCommandesClientDemander(commande.clientId)
  }

  return (
    <>
      <ContentHeader title="List des Commandes Demandées" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* /.card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Commandes Demandées</h3>
              </div>
              {/* /.card-header */}
              <div style={{ overflow: "auto" }} className="card-body">
                <table
                  id="commandeDemander"
                  className="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>Client Id</th>
                      <th>Client</th>
                      <th>Total commande Demandé</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientsData.length === 0 ? (
                      <tr>
                        <td className="text-center">Pas de commande</td>
                        <td className="text-center">Pas de commande</td>
                        <td className="text-center">Pas de commande</td>
                        <td className="text-center">Pas de commande</td>
                      </tr>
                    ) : (
                      clientsData.map((commande) => {
                        return (
                          <tr key={commande.clientId}>
                            <td>{commande.clientId}</td>
                            <td>{commande.firstName}</td>
                            <td>{commande.commandesCount}</td>
                            <td className="text-center">
                              <div className="btn-group">
                                
                                <button onClick={() => { openModal(commande) }} type="button" className="btn btn-success" data-toggle="modal"
                                  data-target="#modal-lg">
                                  <i className="fas fa-eye"></i>
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
      <div className="modal fade" id="modal-lg">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Information commandes</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span style={{ color: "black" }} aria-hidden="true">×</span>
              </button>
            </div>
            <div style={{ overflow: "auto" }} className="modal-body">
              <table style={{width:"200%"}} className="table table-striped">
                <thead>
                  <tr>
                    <th className="text-center" scope="col">Collis</th>
                    <th className="text-center" scope="col">Deliver At</th>
                    <th className="text-center" scope="col">Déstinateur</th>
                    <th className="text-center" scope="col">Déstination</th>
                    <th className="text-center" scope="col">Prix Collis</th>
                    <th className="text-center" scope="col">Téléphone Destinateur</th>
                    <th className="text-center" scope="col">Status Commande</th>
                    <th className="text-center" scope="col">Status Paiement</th>
                    <th className="text-center" scope="col">Livreur</th>
                    <th className="text-center" scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {CommandesClient.map((commande) => (
                    <tr>
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
                              Pas de livreur
                            </span>)
                          }
                        </a>
                        <div className="dropdown-overflow dropdown-menu">
                          {livreurs.length === 0 ? (
                            <a className="dropdown-item">Vide</a>
                            ) : (
                              livreurs.map((liv,index) => (
                                <>
                                {index==0 && <a
                                  style={{
                                    color:
                                      "grey"
                                  }}
                                  onClick={() => {
                                    updateLivreurOfTheCommande(
                                      -1,
                                      commande.idCommande
                                    );
                                  }}
                                  className="dropdown-item"
                                  href=""
                                >
                                  Par défaut
                                </a>}
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
                                </>
                                
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
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer justify-content-between">
              <a></a>
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                <a style={{ color: "black" }}>Close</a>
              </button>
            </div>
          </div>
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>
      {/* /.modal */}

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

export default Demander;
