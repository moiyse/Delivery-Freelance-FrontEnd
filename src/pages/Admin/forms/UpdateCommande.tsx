import { useEffect, useState } from "react";
import "./forms.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCommandeById, updateCommandeById } from "../tables/CommandesService";
import { fetchAllLivreurs } from "../tables/UsersService";
import { useNotification } from "@app/modules/main/header/notifications-dropdown/NotificationContext";
import { ville, villes } from "@app/pages/Admin/forms/ville";


interface Livreur {
  idUser:number
  firstName: string;
  lastName: string;
}
interface UpdateCommandeProps {
    commandeId: number | null;
}
const UpdateCommande: React.FC<UpdateCommandeProps>  = ({commandeId}) => {
  const [commande,setCommande]=useState({
    idCommande: 0,
    depart: '',
    departVille : '',
    departCite : '',
    destination: '',
    destinationVille: '',
    destinationCite: '',
    paymentStatus: '',
    commandeStatus: '',
    createdAt: '',
    delivredAt: '',
    nomDestinataire: '',
    prenomDestinataire: '',
    phoneDestinataire: '',
    prixArticle: '',
    articles: '',
    livreurId: '',
    clientId: ''
    })  
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
  const [departCite, setDepartCite] = useState("");
  const [destinationCite, setDestinationCite] = useState("");
  const [departVille, setDepartVille] = useState("");
  const [destinationVille, setDestinationVille] = useState("");
  const [departCiteList, setDepartCiteList] = useState<string[]>([]);
  const [destinationCiteList, setDestinationCiteList] = useState<string[]>([]);

  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchCommandeById = async () => {
      const data = await getCommandeById(commandeId);
      setCommande(data)
      setArticles(data.articles)
    }; 
    const fetchLivreus=async()=>{
      const data=await fetchAllLivreurs()
      setLivreurs(data)
    }
    fetchCommandeById()
    fetchLivreus()
  }, [commandeId]);

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

  const handleUpdateButton=async()=>{
    const commandeUpdated={
      depart:depart ||commande.depart,
      departVille: departVille || commande.departVille,
      departCite: departCite || commande.departCite,
      destination:destination || commande.destination ,
      destinationVille: destinationVille || commande.destinationVille,
      destinationCite: destinationCite || commande.destinationCite,
      paymentStatus:statusPayment || commande.paymentStatus ,
      commandeStatus:statusCommande || commande.commandeStatus ,
      delivredAt:selectedDateTime||commande.delivredAt,
      nomDestinataire:nomDest || commande.nomDestinataire,
      prenomDestinataire:prenomDest||commande.prenomDestinataire,
      phoneDestinataire:phoneDest||commande.phoneDestinataire,
      prixArticle:prixArticle||commande.prixArticle,
      articles:articles||commande.articles,
      livreurId:livreur||commande.livreurId,
      vue:false,
      originOfVue:'fromAdminUpdate'

    }
    try{
      updateCommandeById(commandeId,commandeUpdated)
      addNotification({
        message: 'New command added!',
        type: 'success',
      });
    }catch(error){
      throw(error)
    }

  }

  
  return (
    <>
    
      <div className="card card-primary form-card">
        <div className="card-header">
          <h3 className="card-title">Modifier Commande</h3>
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
                    value={articles}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder={commande.articles}
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
                    placeholder={commande.depart}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Adresse De Destination</label>
                  <input
                    onChange={(e)=>{setDestination(e.target.value)}}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder={commande.destination}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
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
                    <option disabled selected>{commande.destinationVille}</option>
                    {ville.map(ville => (<option value={ville}>{ville}</option>))}
                  </select>
                  
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
                    <option disabled selected>{commande.destinationCite}</option>
                    {destinationCiteList.map(cite => (<option value={cite}>{cite}</option>))}
                  </select>
                  
                </div>
                
              </div>
            </div>
            <div className="form-group">
              <div className="row">
              <div className="col-md-6">
                  <div>
                    <label>Date de livraison</label>
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
                        placeholderText={commande.delivredAt}
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
                  <select className="form-control" onChange={(e)=>{setStatusCommande(e.target.value)}} >
                    <option>en préparation</option>
                    <option>reporté</option>
                    <option>annulé</option>
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
                    placeholder={commande.nomDestinataire}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Prenom Du Distinateur</label>
                  <input
                    onChange={(e)=>{setPrenomDest(e.target.value)}}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder={commande.prenomDestinataire}
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
                    placeholder={commande.phoneDestinataire}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Prix De La Collis</label>
                  <input
                    onChange={(e)=>{setPrixArticle(Number(e.target.value))}}
                    type="number"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder={commande.prixArticle}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /.card-body */}
          <div className="card-footer">
            <button onClick={handleUpdateButton} type="button" className="btn btn-primary">
              Modifier
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateCommande;
