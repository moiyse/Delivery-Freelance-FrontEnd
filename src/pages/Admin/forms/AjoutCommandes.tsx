import { useEffect, useState } from "react";
import "./forms.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {GET_ALL_LIVREUR} from '../../../../apiUrls'
import { addCommande } from "../tables/CommandesService";
import { fetchAllLivreurs } from "../tables/UsersService";
interface Livreur {
  idUser:number
  firstName: string;
  lastName: string;
}
const AjoutCommandes = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [livreurs,setLivreurs]=useState<Livreur[]>([]);
  const [articles,setArticles]=useState('')
  const [destination,setDestination]=useState('')
  const [depart,setDepart]=useState('')
  const [livreur,setLivreur]=useState('')
  const [statusCommande,setStatusCommande]=useState('')
  const [statusPayment,setStatusPayment]=useState('')
  const [nomDest,setNomDest]=useState('')
  const [prenomDest,setPrenomDest]=useState('')
  const [phoneDest,setPhoneDest]=useState('');
  const [prixArticle,setPrixArticle]=useState<number>(0)
  useEffect(() => {
    const fetchLivreurs = async () => {
      const data = await fetchAllLivreurs();
      setLivreurs(data);
    }; 
    fetchLivreurs()
  }, []);

  const handleSubmitButton=async()=>{
    const commandeToSend={
      depart:depart,
      destination:destination,
      paymentStatus:statusPayment,
      commandeStatus:statusCommande,
      delivredAt:selectedDateTime,
      livreurId:livreur,
      //clientId: houni lezem tgeti el id ta3 el admin el authentificated
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
                  <input
                    onChange={(e)=>{setArticles(e.target.value)}}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Merci De Séparer Les Articles Avec -"
                  />    
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Adresse De Départ</label>
                  <input
                    onChange={(e)=>{setDepart(e.target.value)}}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Choisir votre destination"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Adresse De Destination</label>
                  <input
                    onChange={(e)=>{setDestination(e.target.value)}}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Choisir votre destination"
                  />
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
                <div className="col">
                  <label>Assigner Livreur</label>
                  <select className="form-control" onChange={(e)=>{setLivreur(e.target.value)}}>
                  {livreurs.map((livreur, index) => (
                    <option key={livreur.idUser} value={livreur.idUser}>
                      {livreur.firstName} {livreur.lastName}
                    </option>
                  ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Statut Du Commande</label>
                  <select className="form-control" onChange={(e)=>{setStatusCommande(e.target.value)}}>
                    <option>en préparation</option>
                    <option>en attente pickup</option>
                    <option>en dépot</option>
                    <option>en cours de livraison</option>
                    <option>livré</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Statut Du Paiement </label>
                  <select className="form-control" onChange={(e)=>{setStatusPayment(e.target.value)}} >
                    <option>payé</option>
                    <option>nonPayé</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Nom Du Distinateur</label>
                  <input
                    onChange={(e)=>{setNomDest(e.target.value)}}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Nom Du Distinateur"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Prenom Du Distinateur</label>
                  <input
                    onChange={(e)=>{setPrenomDest(e.target.value)}}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Prenom Du Distinateur"
                  />
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
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Prix De L'article</label>
                  <input
                    onChange={(e)=>{setPrixArticle(Number(e.target.value))}}
                    type="number"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Prix De L'article"
                  />
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

export default AjoutCommandes;
