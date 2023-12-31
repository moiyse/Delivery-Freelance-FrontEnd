import { useEffect, useState } from "react";
import "../../Admin/forms/forms.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCommandeById, updateCommandeById } from "../../Admin/tables/CommandesService";
import { fetchAllLivreurs } from "../../Admin/tables/UsersService";
interface Livreur {
  idUser:number
  firstName: string;
  lastName: string;
}
interface UpdateCommandeProps {
    commandeId: number | null;
}
const UpdateCommandeLivreur: React.FC<UpdateCommandeProps>  = ({commandeId}) => {
  const [commande,setCommande]=useState({
    idCommande: 0,
    depart: '',
    destination: '',
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
  useEffect(() => {
    const fetchCommandeById = async () => {
      const data = await getCommandeById(commandeId);
      setCommande(data)
    }; 
    const fetchLivreus=async()=>{
      const data=await fetchAllLivreurs()
      setLivreurs(data)
    }
    fetchCommandeById()
    fetchLivreus()
  }, [commandeId]);

  const handleUpdateButton=async()=>{
    const commandeUpdated={
      depart:depart ||commande.depart,
      destination:destination || commande.destination ,
      delivredAt:selectedDateTime||commande.delivredAt,
      nomDestinataire:nomDest || commande.nomDestinataire,
      prenomDestinataire:prenomDest||commande.prenomDestinataire,
      phoneDestinataire:phoneDest||commande.phoneDestinataire,
      prixArticle:prixArticle||commande.prixArticle,
      articles:articles||commande.articles,

    }
    try{
      updateCommandeById(commandeId,commandeUpdated)
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

export default UpdateCommandeLivreur;
