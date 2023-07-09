import { ContentHeader } from "@app/components";
import { useEffect, useState } from "react";
import "./forms.css";
import { CREATE_USER_URL,GET_ALL_LIVREUR,GET_ALL_CLIENT_WITH_NOT_PAYED_COMMANDS, Create_PaymentExpediteur } from "../../../../apiUrls.jsx";
import axios from "axios";
import Select from "react-select";

type User = {
  idUser: number;
  firstName: string;
  lastName: String;
  email: string;
  phone: string;
  role: string;
  retour: number;
  livrer: number;
  caisse: number;
  status: string;
  createdAt: string;
  passedCommandeIfClient:Commande[];

};

type Commande = {
    idCommande: number;
    name: string;
    depart: String;
    destination: string;
    paymentStatus: string;
    commandeStatus: string;
    createdAt: Date;
    delivredAt: Date;
    
  };

const AjoutPaymentExpediteur = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [clientSelected, setClientSelected] = useState("");
  const [livreurSelected, setLivreurSelected] = useState("");
  const [retour, setRetour] = useState("");
  const [livraison, setLivraison] = useState("");
  const [allLivreur, setAllLivreur] = useState<User[]>([]);
  const [allClient, setAllClient] = useState<User[]>([]);
  const [clientCommandeNotPayed, setClientCommandeNotPayed] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get(GET_ALL_LIVREUR)
      .then((res) => {
        setAllLivreur(res.data);
        console.log("res livreu : ", res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(GET_ALL_CLIENT_WITH_NOT_PAYED_COMMANDS)
      .then((res) => {
        setClientCommandeNotPayed(res.data);
        console.log("res client not payed : ", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  
  // Custom style select-react
  const customSelectStyles = {
    control: (provided:any) => ({
      ...provided,
      backgroundColor: 'white',
    }),
    option: (provided:any, state:any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#e4e4e4' : 'white',
      color: state.isSelected ? 'black' : 'black',
      '&:hover': {
        backgroundColor: '#f6f6f6', // Set the background color on hover
      },
      borderBottom:"1px solid #e4e4e4"
    }),
    menuList: (provided:any) => ({
        ...provided,
        height: '150px', // Set the desired height for the dropdown list
      }),
    // Add more style overrides as needed
  };

  const saveData = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("PaymentExpediteurClientId", clientSelected);
    formData.append("PaymentExpediteurLivreurId", livreurSelected);
    try {
      await axios.post(Create_PaymentExpediteur, formData, { 
        headers: {
          "Content-Type": "application/json",
        },
      }).then(function (response) {
        console.log(response.data)
        window.location.href = "/listPaymentExpediteur";
        
    });
    } catch (error) {
      console.log(error);
    }
  };

  const allLivreurOptions = allLivreur.map((livreur: any) => {
    return {
      value: livreur.idUser,
      label: (
        <div>
          <div>
            Livreur: {livreur.firstName} {livreur.lastName}
          </div>
          <div className="ml-2">Caisse: {livreur?.caisse ? livreur.caisse : "0 DT"}</div>
        </div>
      ),
    };
  });

  const allClientOptions = clientCommandeNotPayed.map( (client: any) => {
    return {
      value: client.idUser,
      label: (
        <div>
          <div>
            Client: {client.firstName} {client.lastName}
          </div>
          <div className="ml-2">
            Livrer non payé : {client.passedCommandeIfClient.filter((commande:any)=>commande.commandeStatus == "livrer").length}
            <br/>
            Annuler non payé : {client.passedCommandeIfClient.filter((commande:any)=>commande.commandeStatus == "annuler").length}
          </div>
        </div>
      ),
    };
  });

  
  return (
    <>
      <ContentHeader title="Ajouter Payment Expediteur" />
      <div className="card card-primary form-card">
        <div className="card-header">
          <h3 className="card-title">Planifier Payment Expediteur</h3>
        </div>
        {/* /.card-header */}
        {/* form start */}
        <form>
          <div className="card-body card-ajouterPayment">
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label>Client</label>
                  <Select
                    options={allClientOptions}
                    onChange={ (selectedOption) => {
                      setClientSelected(( selectedOption)?.value);
                      console.log("client : ",clientSelected);
                    }}
                    placeholder="Selectionner Client"
                    styles={customSelectStyles} // Apply custom styles
                  />
                </div>

                <div className="col-md-6">
                  <label>Livreur</label>
                  <Select
                    options={allLivreurOptions}
                    onChange={(selectedOption) => {
                      setLivreurSelected(selectedOption?.value);
                      console.log("livreur : ",livreurSelected);
                    }}
                    placeholder="Selectionner Livreur"
                    styles={customSelectStyles} // Apply custom styles
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /.card-body */}
          <div className="card-footer">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={saveData}
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AjoutPaymentExpediteur;
