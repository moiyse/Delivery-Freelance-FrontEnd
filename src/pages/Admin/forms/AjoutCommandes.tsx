import { useEffect, useState } from "react";
import "./forms.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GET_ALL_CLIENTS, GET_ALL_LIVREUR } from "../../../../apiUrls";
import { addCommande } from "../tables/CommandesService";
import { fetchAllLivreurs } from "../tables/UsersService";
import { ContentHeader } from "@app/components";
import { getCurrentUser } from "@app/services/auth";
import { ville, villes } from "@app/pages/Admin/forms/ville";

interface Livreur {
  idUser: number;
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
  caisse: number;
  status: string;
  createdAt: string;
};

const AjoutCommandes = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [livreurs, setLivreurs] = useState<Livreur[]>([]);
  const [clients, setClients] = useState<User[]>([]);
  const [articles, setArticles] = useState("");
  const [destination, setDestination] = useState("");
  const [depart, setDepart] = useState("");
  const [nomDest, setNomDest] = useState("");
  const [prenomDest, setPrenomDest] = useState("");
  const [phoneDest, setPhoneDest] = useState("");
  const [prixArticle, setPrixArticle] = useState<number>(0);
  const [departVille, setDepartVille] = useState("");
  const [destinationVille, setDestinationVille] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [departCiteList, setDepartCiteList] = useState<string[]>([]);
  const [destinationCiteList, setDestinationCiteList] = useState<string[]>([]);
  const [departCite, setDepartCite] = useState("");
  const [destinationCite, setDestinationCite] = useState("");
  const [commandeType, setCommandeType] = useState("Commande normale");
  const [selectedOption, setSelectedOption] = useState('');
  const [commentaire, setCommentaire] = useState('');



  const [phoneDestError, setPhoneDestError] = useState("");
  const [articlesError, setArticlesError] = useState("");
  const [destinationError, setDestinationError] = useState("");
  const [villeDestinationError, setVilleDestinationError] = useState("");
  const [departError, setDepartError] = useState("");
  const [villeDepartError, setVilleDepartError] = useState("");
  const [nomDestError, setNomDestError] = useState("");
  const [prenomDestError, setPrenomDestError] = useState("");
  const [prixArticleError, setPrixArticleError] = useState("");
  const [selectedDateTimeError, setSelectedDateTimeError] = useState("");

  useEffect(() => {
    const fetchLivreurs = async () => {
      const data = await fetchAllLivreurs();
      setLivreurs(data);
    };
    fetchLivreurs();
    const fetchClients = async () => {
      const data = await getAllClients();
      setClients(data);
    }
    fetchClients()
  }, []);

  const departVilleHandler = (ville: string) => {

    switch (ville) {
      case "Tunis": setDepartCiteList(villes.tunis); break;
      case "Ariana": setDepartCiteList(villes.ariana); break;
      case "Béja": setDepartCiteList(villes.Beja); break;
      case "Ben Arous": setDepartCiteList(villes.Ben_Arous); break;
      case "Bizerte": setDepartCiteList(villes.Bizerte); break;
      case "Gabès": setDepartCiteList(villes.Gabes); break;
      case "Gafsa": setDepartCiteList(villes.Gafsa); break;
      case "Jendouba": setDepartCiteList(villes.Jendouba); break;
      case "Kairouan": setDepartCiteList(villes.Kairouan); break;
      case "Kasserine": setDepartCiteList(villes.Kasserine); break;
      case "Kébili": setDepartCiteList(villes.Kebili); break;
      case "Kef": setDepartCiteList(villes.Kef); break;
      case "Mahdia": setDepartCiteList(villes.Mahdia); break;
      case "Manouba": setDepartCiteList(villes.Manouba); break;
      case "Médenine": setDepartCiteList(villes.Mednine); break;
      case "Monastir": setDepartCiteList(villes.monastir); break;
      case "Nabeul": setDepartCiteList(villes.nabeul); break;
      case "Sfax": setDepartCiteList(villes.Sfax); break;
      case "Sidi Bouzid": setDepartCiteList(villes.Sidi_Bouzid); break;
      case "Siliana": setDepartCiteList(villes.Siliana); break;
      case "Sousse": setDepartCiteList(villes.Sousse); break;
      case "Tataouine": setDepartCiteList(villes.Tataouine); break;
      case "Tozeur": setDepartCiteList(villes.Tozeur); break;
      case "Zaghouan": setDepartCiteList(villes.Zaghouan); break;
    }
  }

  const destinationVilleHandler = (ville: string) => {

    switch (ville) {
      case "Tunis": setDestinationCiteList(villes.tunis); break;
      case "Ariana": setDestinationCiteList(villes.ariana); break;
      case "Béja": setDestinationCiteList(villes.Beja); break;
      case "Ben Arous": setDestinationCiteList(villes.Ben_Arous); break;
      case "Bizerte": setDestinationCiteList(villes.Bizerte); break;
      case "Gabès": setDestinationCiteList(villes.Gabes); break;
      case "Gafsa": setDestinationCiteList(villes.Gafsa); break;
      case "Jendouba": setDestinationCiteList(villes.Jendouba); break;
      case "Kairouan": setDestinationCiteList(villes.Kairouan); break;
      case "Kasserine": setDestinationCiteList(villes.Kasserine); break;
      case "Kébili": setDestinationCiteList(villes.Kebili); break;
      case "Kef": setDestinationCiteList(villes.Kef); break;
      case "Mahdia": setDestinationCiteList(villes.Mahdia); break;
      case "Manouba": setDestinationCiteList(villes.Manouba); break;
      case "Médenine": setDestinationCiteList(villes.Mednine); break;
      case "Monastir": setDestinationCiteList(villes.monastir); break;
      case "Nabeul": setDestinationCiteList(villes.nabeul); break;
      case "Sfax": setDestinationCiteList(villes.Sfax); break;
      case "Sidi Bouzid": setDestinationCiteList(villes.Sidi_Bouzid); break;
      case "Siliana": setDestinationCiteList(villes.Siliana); break;
      case "Sousse": setDestinationCiteList(villes.Sousse); break;
      case "Tataouine": setDestinationCiteList(villes.Tataouine); break;
      case "Tozeur": setDestinationCiteList(villes.Tozeur); break;
      case "Zaghouan": setDestinationCiteList(villes.Zaghouan); break;
    }
  }

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
    setCommandeType(event.target.value)
  };



  const getAllClients = async () => {
    try {
      const response = await fetch(GET_ALL_CLIENTS);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  }


  const handleSubmitButton = async () => {
    let isValid = true;

    if (articles == "") {
      setArticlesError("Veuillez entrer articles");
      isValid = false;
    } else {
      setArticlesError("");
    }

    if (destination == "") {
      setDestinationError("Veuillez entrer destination");
      isValid = false;
    } else {
      setDestinationError("");
    }

    if (depart == "") {
      setDepartError("Veuillez entrer depart");
      isValid = false;
    } else {
      setDepartError("");
    }

    if (departVille == "") {
      setDepartError("Veuillez entrer la ville de depart");
      isValid = false;
    } else {
      setDepartError("");
    }

    if (destinationVille == "") {
      setDestinationError("Veuillez entrer la ville de destination");
      isValid = false;
    } else {
      setDepartError("");
    }

    if (departCite == "") {
      setDepartError("Veuillez entrer le cité de depart");
      isValid = false;
    } else {
      setDepartError("");
    }

    if (destinationCite == "") {
      setDestinationError("Veuillez entrer le cité de destination");
      isValid = false;
    } else {
      setDepartError("");
    }

    if (nomDest == "") {
      setNomDestError("Veuillez entrer recipient prenom");
      isValid = false;
    } else {
      setNomDestError("");
    }

    if (prenomDest == "") {
      setPrenomDestError("Veuillez entrer recipient nom");
      isValid = false;
    } else {
      setPrenomDestError("");
    }

    if (!selectedDateTime) {
      setSelectedDateTimeError("Veuillez selectionner date");
      isValid = false;
    } else {
      setSelectedDateTimeError("");
    }

    if (phoneDest == "") {
      setPhoneDestError("Veuillez entrer telephone");
      isValid = false;
    } else {
      setPhoneDestError("");
    }

    if (prixArticle <= 0) {
      setPrixArticleError("Please enter a valid price for the article");
      isValid = false;
    } else {
      setPrixArticleError("");
    }

    if (!isValid) {
      return; // Don't proceed if there are validation errors
    }

    const commandeToSend = {
      depart: depart,
      departVille: departVille,
      departCite: departCite,
      destination: destination,
      destinationVille: destinationVille,
      destinationCite: destinationCite,
      delivredAt: selectedDateTime,
      clientId: selectedClientId,
      nomDestinataire: nomDest,
      prenomDestinataire: prenomDest,
      phoneDestinataire: phoneDest,
      commentaire: commentaire,
      prixArticle: prixArticle,
      articles: articles,
      commandeType: commandeType,
    };
    addCommande(commandeToSend);
  };

  return (
    <>
      <ContentHeader title="Ajouter Commande" />
      <div className="card card-primary form-card">
        <div className="card-header">
          <h3 className="card-title">Ajouter Commandes</h3>
        </div>
        {/* /.card-header */}
        {/* form start */}
        <form>
          <div className="card-body">
            <div className="form-group">
              <div className="row">
                <label htmlFor="exampleInputEmail1">Articles</label>
                <textarea
                  onChange={(e) => { setArticles(e.target.value) }}
                  style={{ height: "90px" }}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Merci De Séparer Les Articles Avec -"
                />
                {articlesError && (
                  <div className="error">
                    {articlesError}
                    <i
                      style={{ fontSize: "14px" }}
                      className="fas fa-exclamation ml-2"
                    ></i>
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Adresse De Départ</label>
                  <input
                    onChange={(e) => {
                      setDepart(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Choisir votre depart"
                  />
                  {departError && (
                    <div className="error">
                      {departError}
                      <i
                        style={{ fontSize: "14px" }}
                        className="fas fa-exclamation ml-2"
                      ></i>
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">
                    Adresse De Destination
                  </label>
                  <input
                    onChange={(e) => {
                      setDestination(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Choisir votre destination"
                  />
                  {destinationError && (
                    <div className="error">
                      {destinationError}
                      <i
                        style={{ fontSize: "14px" }}
                        className="fas fa-exclamation ml-2"
                      ></i>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label>Ville de départ</label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setDepartVille(e.target.value);
                      departVilleHandler(e.target.value);

                      console.log(departVille);
                    }}
                  >
                    <option disabled selected>Selectinner Ville</option>
                    {ville.map(ville => (<option value={ville}>{ville}</option>))}
                  </select>
                  {villeDepartError && (
                    <div className="error">
                      {villeDepartError}
                      <i
                        style={{ fontSize: "14px" }}
                        className="fas fa-exclamation ml-2"
                      ></i>
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <label>Ville de déstinateur</label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      destinationVilleHandler(e.target.value)

                      setDestinationVille(e.target.value);
                      console.log(destinationVille);
                    }}
                  >
                    <option disabled selected>Selectionner ville déstinateur</option>
                    {ville.map(ville => (<option value={ville}>{ville}</option>))}
                  </select>
                  {villeDestinationError && (
                    <div className="error">
                      {villeDestinationError}
                      <i
                        style={{ fontSize: "14px" }}
                        className="fas fa-exclamation ml-2"
                      ></i>
                    </div>
                  )}
                </div>
              </div>
              {(departVille != "" && destinationVille != "") && <div className="row">
                <div className="col-md-6">
                  <label>Cité de départ</label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setDepartCite(e.target.value);
                      console.log(departVille);
                    }}
                  >
                    <option disabled selected>Selectinner Cité</option>
                    {departCiteList.map(cite => (<option value={cite}>{cite}</option>))}
                  </select>
                  {villeDepartError && (
                    <div className="error">
                      {villeDepartError}
                      <i
                        style={{ fontSize: "14px" }}
                        className="fas fa-exclamation ml-2"
                      ></i>
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <label>Cité de déstinateur</label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setDestinationCite(e.target.value);
                      console.log(destinationVille);
                    }}
                  >
                    <option disabled selected>Selectionner Cite</option>
                    {destinationCiteList.map(cite => (<option value={cite}>{cite}</option>))}
                  </select>
                  {villeDestinationError && (
                    <div className="error">
                      {villeDestinationError}
                      <i
                        style={{ fontSize: "14px" }}
                        className="fas fa-exclamation ml-2"
                      ></i>
                    </div>
                  )}
                </div>
              </div>}
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <div>
                    <label>Date et temps pour la livraison</label>
                    <div
                      className="input-group date"
                      id="reservationdatetime"
                      data-target-input="nearest"
                    >
                      <DatePicker
                        selected={selectedDateTime}
                        onChange={(date: any) => setSelectedDateTime(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="yyyy-MM-dd HH:mm"
                        placeholderText="Date et temps préférer"
                        className="form-control datetimepicker-input"
                        customInput={
                          <input
                            type="text"
                            className="form-control datetimepicker-input"
                          />
                        }
                        popperClassName="custom-popper"
                        timeCaption="Time"
                        shouldCloseOnSelect={false}
                        withPortal
                      />
                      {selectedDateTimeError && (
                        <div className="error">
                          {selectedDateTimeError}
                          <i
                            style={{ fontSize: "14px" }}
                            className="fas fa-exclamation ml-2"
                          ></i>
                        </div>
                      )}
                      <div
                        className="input-group-append"
                        data-target="#reservationdatetime"
                        data-toggle="datetimepicker"
                      >
                        <div className="input-group-text">
                          <i className="fa fa-calendar" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">
                    Téléphone Du Distinateur
                  </label>
                  <input
                    onChange={(e) => {
                      setPhoneDest(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Téléphone Du Distinateur"
                  />
                  {phoneDestError && (
                    <div className="error">
                      {phoneDestError}
                      <i
                        style={{ fontSize: "14px" }}
                        className="fas fa-exclamation ml-2"
                      ></i>
                    </div>
                  )}
                </div>

              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Nom Du Distinateur</label>
                  <input
                    onChange={(e) => {
                      setNomDest(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Nom Du Distinateur"
                  />
                  {nomDestError && (
                    <div className="error">
                      {nomDestError}
                      <i
                        style={{ fontSize: "14px" }}
                        className="fas fa-exclamation ml-2"
                      ></i>
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">
                    Prenom Du Distinateur
                  </label>
                  <input
                    onChange={(e) => {
                      setPrenomDest(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Prenom Du Distinateur"
                  />
                  {prenomDestError && (
                    <div className="error">
                      {prenomDestError}
                      <i
                        style={{ fontSize: "14px" }}
                        className="fas fa-exclamation ml-2"
                      ></i>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">
                    Client
                  </label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setSelectedClientId(e.target.value);
                      //console.log(client);
                    }}
                  >
                    <option disabled selected>Selectionner Client</option>
                    {clients.map(client => <option value={client.idUser}>{client.firstName + " " + client.lastName}</option>)}
                  </select>
                </div>
                <div style={{ display: "inline-flex" }} className="col-md-6 align-items-center">
                  
                <div className="mx-lg-1">
                <input
                    type="radio"
                    id="contactChoice1"
                    name="contact"
                    value="Commande normale"
                    checked={selectedOption === 'Commande normale'}
                    onChange={handleOptionChange}
                  />
                  <label>Commande normale</label>
                </div>

                  <div className="mx-lg-1">
                  <input
                    type="radio"
                    name="contact"
                    value="Echange payant"
                    checked={selectedOption === 'Echange payant'}
                    onChange={handleOptionChange}
                  />
                  <label>Echange payant</label>

                  </div>

                  
                  <div className="mx-lg-1">
                  <input
                    type="radio"
                    id="contactChoice3"
                    name="contact"
                    value="Echange non payant"
                    checked={selectedOption === 'Echange non payant'}
                    onChange={handleOptionChange}
                  />
                  <label>Echange non payant</label>
                  </div>
                </div>
              </div>
            </div>
            {commandeType != "Echange non payant" && <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Prix De L'article</label>
                  <input
                    onChange={(e) => {
                      setPrixArticle(Number(e.target.value));
                    }}
                    type="number"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Prix De La Collis"
                  />
                  {prixArticleError && (
                    <div className="error">
                      {prixArticleError}
                      <i
                        style={{ fontSize: "14px" }}
                        className="fas fa-exclamation ml-2"
                      ></i>
                    </div>
                  )}
                </div>
              </div>
            </div>}
            <div className="form-group">
              <div className="row">
                <div className="col">

                  <label htmlFor="exampleInputEmail1">Commentaire</label>
                  <textarea
                    onChange={(e) => { setCommentaire(e.target.value) }}
                    style={{ height: "90px" }}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Ecrire commentaire"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /.card-body */}
          <div className="card-footer">
            <button
              onClick={handleSubmitButton}
              type="button"
              className="btn btn-primary"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AjoutCommandes;
