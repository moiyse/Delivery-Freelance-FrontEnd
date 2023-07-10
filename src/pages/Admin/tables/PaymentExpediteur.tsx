import { useEffect, useState } from "react";
import "./users.css";
import { ContentHeader } from "@app/components";
import {
  GET_ALL_PaymentExpediteur,
  GET_CLIENT_BY_ID,
} from "../../../../apiUrls.jsx";
import axios from "axios";

type PaymentExpediteur = {
  idPayment: number;
  createdAt: Date;
  PaymentExpediteurLivreurId: number;
  PaymentExpediteurClientId: number;
};

type Commande = {
  idCommande: number;
  name: string;
  paymentStatus: string;
  commandeStatus: string;
};

const PaymentExpediteur = () => {
  const [paymentExpediteurs, setPaymentExpediteur] = useState<
    PaymentExpediteur[]
  >([]);
  const [clientById, setClientById] = useState<any[]>([]);
  const [dataFetched, setDataFetched] = useState(false);

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
    const script = document.createElement("script");
    script.src = "js/tablePaymentExpediteur.js";
    script.async = true;
    document.body.appendChild(script);
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
              <div className="card-body">
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
                              data-toggle="modal"
                              data-target="#modal-list-collis"
                            >
                              List des collis
                            </a>
                          </td>
                          <td>
                            {
                              data.client.passedCommandeIfClient.filter(
                                (commande: any) =>
                                  commande.commandeStatus === "livré"
                              ).length
                            }
                          </td>
                          <td>
                            {
                              data.client.passedCommandeIfClient.filter(
                                (commande: any) =>
                                  commande.commandeStatus === "annulé"
                              ).length
                            }
                          </td>
                          <td>
                            {data.client.passedCommandeIfClient.filter(
                              (commande: any) =>
                                commande.commandeStatus === "livré"
                            ).length *
                              data.client.livraison +
                              data.client.passedCommandeIfClient.filter(
                                (commande: any) =>
                                  commande.commandeStatus === "annulé"
                              ).length *
                                data.client.retour}{" "}
                            DT
                          </td>
                          <td className="d-flex justify-content-center">
                            <div className="btn-group">
                              <button type="button" className="btn btn-warning">
                                <i className="fas fa-pen"></i>
                              </button>
                              <button type="button" className="btn btn-danger">
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                          <td>
                            none
                          </td>
                          <td>
                            none
                          </td>
                          <td>
                            none
                          </td>
                          <td>
                             none
                             
                          </td>
                          <td>
                            none
                          </td>
                          <td>
                            none
                          </td>
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
    </>
  );
};

export default PaymentExpediteur;
