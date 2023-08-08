import { useEffect, useState } from "react";
import "./users.css";
import { ContentHeader } from "@app/components";
import {
  DELETE_PAYMENTEXPEDITEUR,
  GET_ALL_PaymentExpediteur,
  GET_CLIENT_BY_ID,
} from "../../../../apiUrls.jsx";
import axios from "axios";
import Swal from "sweetalert2";

type PaymentExpediteur = {
  idPaymentExpediteur: number;
  createdAt: Date;
  PaymentExpediteurLivreurId: number;
  PaymentExpediteurClientId: number;
};

type Commande = {
  idCommande: number;
  paymentStatus: string;
  commandeStatus: string;
  prixArticle:number;
  articles:string
};

const PaymentExpediteur = () => {
  const [paymentExpediteurs, setPaymentExpediteur] = useState<
    PaymentExpediteur[]
  >([]);
  const [clientById, setClientById] = useState<any[]>([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [selectedListCollis, setSelectedListCollis] = useState<Commande[]>([]);

  useEffect(() => {
    fetchPaymentExpediteur();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetch data payment expediteur", paymentExpediteurs);
      const paymentExpediteursData = paymentExpediteurs.map(
        async (paymentExpediteur) => {
          const client = await getClientsById(
            paymentExpediteur.PaymentExpediteurClientId
          );
          return {
            paymentExpediteur,
            client,
          };
        }
      );

      const resolvedData = await Promise.all(paymentExpediteursData);
      setClientById(resolvedData);
    };

    fetchData();
    setDataFetched(true);
  }, [paymentExpediteurs]);

  useEffect(() => {
    if (clientById.length != 0) {
      const script = document.createElement("script");
      script.src = "js/tablePaymentExpediteur.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Clean up the added script when the component unmounts
        document.body.removeChild(script);
      };
    }
  }, [clientById]);

  const fetchPaymentExpediteur = async () => {
    await axios
      .get(GET_ALL_PaymentExpediteur)
      .then((res) => {
        setPaymentExpediteur(res.data);
        console.log("res client not payed : ", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatDateToString = (date: Date) => {
    const formattedDate = new Date(date).toLocaleDateString();
    return formattedDate;
  };

  const getClientsById = async (idClient: number) => {
    try {
      const response = await fetch(GET_CLIENT_BY_ID(idClient));
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const deletePaymentExpediteurById = async (idPaymentExpediteur: number) => {
    try {
      const response = await fetch(
        DELETE_PAYMENTEXPEDITEUR(idPaymentExpediteur),
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      throw error;
    }
  };

  const removePaymentExpediteur = async (idPaymentExpediteur: number) => {
    setPaymentExpediteur((prevPaymentExpediteur) =>
      prevPaymentExpediteur.filter(
        (paymentExpediteur) =>
          paymentExpediteur.idPaymentExpediteur !== idPaymentExpediteur
      )
    );
  };

  const deletePaymentExpediteur = (idPaymentExpediteur: number) => {
    Swal.fire({
      title: "Supprimer un utilisateur",
      text: `Etes vous sur de supprimer l'expedition " ${idPaymentExpediteur} " ?`,
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Supprimer",
      cancelButtonText: "Retour",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePaymentExpediteurById(idPaymentExpediteur);
        window.location.reload()
      }
    });
  };

  const listCollisHandler = (commandes:Commande[]) => {
    setSelectedListCollis(commandes)
  };

  if (!dataFetched) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ContentHeader title="Payment Commandes" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* /.card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Status commandes et payments</h3>
              </div>
              {/* /.card-header */}
              <div style={{overflow:"auto"}} className="card-body">
                <table
                  id="example1"
                  className="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>Date Payment</th>
                      <th>Collis Client</th>
                      <th>Collis Livrer</th>
                      <th>Collis Annuler</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientById.length > 0 ? (
                      clientById.map((data) => (
                        <tr
                          key={data.paymentExpediteur.paymentExpediteurClientId}
                        >
                          <td>
                            {formatDateToString(
                              data.paymentExpediteur.createdAt
                            )}
                          </td>
                          <td>
                            <a
                              onClick={() => {
                                listCollisHandler(data.client.passedCommandeIfClient);
                              }}
                              data-toggle="modal"
                              data-target="#modal-lg"
                            >
                              List des collis
                            </a>
                          </td>
                          <td>
                            {
                              data.client.passedCommandeIfClient?.filter(
                                (commande: any) =>
                                  commande.commandeStatus === "livré"
                              ).length
                            }
                          </td>
                          <td>
                            {
                              data.client.passedCommandeIfClient?.filter(
                                (commande: any) =>
                                  commande.commandeStatus === "annulé"
                              ).length
                            }
                          </td>
                          <td>
                            {data.client.passedCommandeIfClient?.filter(
                              (commande: any) =>
                                commande.commandeStatus === "livré"
                            ).length *
                              data.client.livraison +
                              data.client.passedCommandeIfClient?.filter(
                                (commande: any) =>
                                  commande.commandeStatus === "annulé"
                              ).length *
                                data.client.retour}{" "}
                            DT
                          </td>
                          <td className="d-flex justify-content-center">
                            <div className="btn-group">
                              <button
                                onClick={() => {
                                  deletePaymentExpediteur(
                                    data.paymentExpediteur.idPaymentExpediteur
                                  );
                                }}
                                type="button"
                                className="btn btn-danger"
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>none</td>
                        <td>none</td>
                        <td>none</td>
                        <td>none</td>
                        <td>none</td>
                        <td>none</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Date Payment</th>
                      <th>Collis Client</th>
                      <th>Collis Livrer</th>
                      <th>Collis Annuler</th>
                      <th>Total</th>
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
      <div className="modal fade" id="modal-lg">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Large Modal</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span style={{color:"black"}} aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="text-center" scope="col">Articles</th>
                    <th className="text-center" scope="col">Prix</th>
                    <th className="text-center" scope="col">Status Commande</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedListCollis.map((commande) =>(
                    <tr>
                      <td className="text-center">{commande.articles}</td>
                      <td className="text-center">{commande.prixArticle + "DT"}</td>
                      <td className="pill-td">
                        <a>
                          <span className="badge bg-warning">{commande.paymentStatus}</span>
                        </a>
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
                <a style={{color:"black"}}>Close</a>
              </button>
            </div>
          </div>
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>
      {/* /.modal */}
    </>
  );
};

export default PaymentExpediteur;
