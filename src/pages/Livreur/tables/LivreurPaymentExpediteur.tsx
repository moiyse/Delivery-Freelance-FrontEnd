import { useEffect, useState } from "react";
import "./users.css";
import { ContentHeader } from "@app/components";
import {
  GET_ALL_PaymentExpediteur,
  GET_CLIENT_BY_ID,
  GET_PAYMENTEXPEDITEUR_BY_LIVREURID,
  UPDATE_CLIENT_COMMANDS_TO_PAYED,
} from "../../../../apiUrls.jsx";
import axios from "axios";
import { getCurrentUser } from "@app/services/auth";
import { getUserById, updateUserById } from "@app/pages/Admin/tables/UsersService";

type PaymentExpediteur = {
  idPayment: number;
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

const LivreurPaymentExpediteur = () => {
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
      console.log("client ByID : ",clientById)
    };

    fetchData();
    setDataFetched(true);
  }, [paymentExpediteurs]);

  const fetchPaymentExpediteur = async () => {
    await axios
      .get(GET_PAYMENTEXPEDITEUR_BY_LIVREURID(getCurrentUser().idUser))
      .then((res) => {
        setPaymentExpediteur(res.data);
        console.log("res client not payed : ", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  useEffect(() => {
    if(clientById.length != 0)
    {
      const script = document.createElement("script");
      script.src = "js/tablePaymentExpediteur.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Clean up the added script when the component unmounts
        document.body.removeChild(script);
      };
    }
  }, [clientById])
  

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

  const clientPayed = async (client:any,idClient:number,idPaymentExpediteur:number,idLivreur:number)=>{
    console.log("idClient : ",idClient," idPaymentExpediteur : ",idPaymentExpediteur)
    let livreur = await getUserById(idLivreur)

    livreur.caisse = livreur.caisse - countTotalPrixExpedition(client)
    updateUserById(idLivreur,livreur)

    await axios
      .put(UPDATE_CLIENT_COMMANDS_TO_PAYED(idClient,idPaymentExpediteur))
      .then((res) => {
        console.log("success message : ", res.data);
        window.location.reload()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const countTotalPrixExpedition = (client:any) => {
    return client.passedCommandeIfClient
                            .filter((commande: any) => commande.commandeStatus === "livré").length * client.livraison + client.passedCommandeIfClient.filter( (commande: any) =>
                                  commande.commandeStatus === "annulé").length * client.retour
  }

  const totalCommandePrix = (commandes:Commande[]) => {
    let totalPrix = 0 
    if(commandes.length != 0)
    {
      commandes.forEach(commande => {
        totalPrix = commande.prixArticle + totalPrix
      });
      return totalPrix
    }else{
      return totalPrix
    }
  }

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
                      <th>Date De Création</th>
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
                            {totalCommandePrix(data.client.passedCommandeIfClient) - countTotalPrixExpedition(data.client)}{" "} DT
                          </td>
                          <td className="text-center">
                            <div className="btn-group">
                              <button onClick={async ()=>{await clientPayed(data.client,data.client.idUser,data.paymentExpediteur.idPaymentExpediteur,data.paymentExpediteur.PaymentExpediteurLivreurId)}} type="button" className="btn btn-success">
                                Payer
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                          <td>
                            Pas de donnée
                          </td>
                          <td>
                            Pas de donnée
                          </td>
                          <td>
                            Pas de donnée
                          </td>
                          <td>
                            Pas de donnée
                          </td>
                          <td>
                            Pas de donnée
                          </td>
                        </tr>
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
    </>
  );
};

export default LivreurPaymentExpediteur;
