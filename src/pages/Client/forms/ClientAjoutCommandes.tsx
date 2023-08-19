import { useEffect, useState } from "react";
import "./forms.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addCommande } from "../../../pages/Admin/tables/CommandesService.js";
import { fetchAllLivreurs } from "../../../pages/Admin/tables/UsersService";
import { ContentHeader } from "@app/components";
import { getCurrentUser } from "@app/services/auth";
import { ville } from "@app/pages/Admin/forms/ville";

interface Livreur {
  idUser:number
  firstName: string;
  lastName: string;
}
const ClientAjoutCommande = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [selectedDateTimeError, setSelectedDateTimeError] = useState("");
  const [livreurs,setLivreurs]=useState<Livreur[]>([]);
  const [articles,setArticles]=useState('')
  const [destination,setDestination]=useState('')
  const [depart,setDepart]=useState('')
  const [nomDest,setNomDest]=useState('')
  const [prenomDest,setPrenomDest]=useState('')
  const [phoneDest,setPhoneDest]=useState('');
  const [prixArticle,setPrixArticle]=useState<number>(0)
  const [departVille, setDepartVille] = useState("");
  const [destinationVille, setDestinationVille] = useState("");


  const [phoneDestError, setPhoneDestError] = useState("");
  const [articlesError, setArticlesError] = useState("");
  const [destinationError, setDestinationError] = useState("");
  const [villeDestinationError, setVilleDestinationError] = useState("");
  const [departError, setDepartError] = useState("");
  const [villeDepartError, setVilleDepartError] = useState("");  const [nomDestError, setNomDestError] = useState("");
  const [prenomDestError, setPrenomDestError] = useState("");
  const [prixArticleError, setPrixArticleError] = useState("");


  useEffect(() => {
    const fetchLivreurs = async () => {
      const data = await fetchAllLivreurs();
      setLivreurs(data);
    }; 
    fetchLivreurs()
  }, []);

  const handleSubmitButton=async()=>{

    let isValid = true;

    if (articles =="") {
      setArticlesError("Please enter articles");
      isValid = false;
    } else {
      setArticlesError("");
    }

    if (destination == "") {
      setDestinationError("Please enter the destination");
      isValid = false;
    } else {
      setDestinationError("");
    }

    if (depart == "") {
      setDepartError("Please enter the departure");
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
      setDepartError("Veuillez entrer la ville de destination");
      isValid = false;
    } else {
      setDepartError("");
    }

    if (nomDest == "") {
      setNomDestError("Please enter the recipient's first name");
      isValid = false;
    } else {
      setNomDestError("");
    }

    if (prenomDest == "") {
      setPrenomDestError("Please enter the recipient's last name");
      isValid = false;
    } else {
      setPrenomDestError("");
    }

    if (prixArticle <= 0) {
      setPrixArticleError("Please enter a valid price for the article");
      isValid = false;
    } else {
      setPrixArticleError("");
    }

    if (!selectedDateTime) {
      setSelectedDateTimeError("Please select a date and time");
      isValid = false;
    } else {
      setSelectedDateTimeError("");
    }

    if (!isValid) {
      return; // Don't proceed if there are validation errors
    }

    const commandeToSend={
      depart: depart,
      departVille:departVille,
      destination: destination,
      destinationVille:destinationVille,
      delivredAt:selectedDateTime,
      clientId: getCurrentUser().idUser,
      nomDestinataire:nomDest,
      prenomDestinataire:prenomDest,
      phoneDestinataire:phoneDest,
      prixArticle:prixArticle,
      articles:articles
    }
    addCommande(commandeToSend)
  }
  
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
                    onChange={(e)=>{setArticles(e.target.value)}}
                    style={{height: "90px"}}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Merci De Séparer Les Articles Avec -"
                  />
                  {articlesError && <div className="error">{articlesError}<i style={{fontSize:"14px"}} className="fas fa-exclamation ml-2"></i></div>}
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
                      console.log(departVille);
                    }}
                  >
                    <option disabled selected>Selectinner Ville</option>
                    {ville.map(ville=>(<option value={ville}>{ville}</option>))}
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
                      setDestinationVille(e.target.value);
                      console.log(destinationVille);
                    }}
                  >
                    <option disabled selected>Selectionner Ville</option>
                    {ville.map(ville=>(<option value={ville}>{ville}</option>))}
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
                      {selectedDateTimeError && <div className="error">{selectedDateTimeError}<i style={{fontSize:"14px"}} className="fas fa-exclamation ml-2"></i></div>}
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
                  <label htmlFor="exampleInputEmail1">Prix De La Collis</label>
                  <input
                    onChange={(e)=>{setPrixArticle(Number(e.target.value))}}
                    type="number"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Prix De La Collis"
                  />
                  {prixArticleError && <div className="error">{prixArticleError}<i style={{fontSize:"14px"}} className="fas fa-exclamation ml-2"></i></div>}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Nom Du Destinateur</label>
                  <input
                    onChange={(e)=>{setNomDest(e.target.value)}}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Nom Du Distinateur"
                  />
                  {nomDestError && <div className="error">{nomDestError}<i style={{fontSize:"14px"}} className="fas fa-exclamation ml-2"></i></div>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Prenom Du Destinateur</label>
                  <input
                    onChange={(e)=>{setPrenomDest(e.target.value)}}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Prenom Du Distinateur"
                  />
                  {prenomDestError && <div className="error">{prenomDestError}<i style={{fontSize:"14px"}} className="fas fa-exclamation ml-2"></i></div>}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Téléphone Du Distinateur</label>
                  <input
                    onChange={(e)=>{setPhoneDest(e.target.value)}}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Téléphone Du Distinateur"
                  />
                  {phoneDestError && <div className="error">{phoneDestError}<i style={{fontSize:"14px"}} className="fas fa-exclamation ml-2"></i></div>}
                </div>
              </div>
            </div>
          </div>
          {/* /.card-body */}
          <div className="card-footer">
            <button onClick={handleSubmitButton} type="button" className="btn btn-primary">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ClientAjoutCommande;
