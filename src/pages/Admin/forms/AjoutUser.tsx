import { ContentHeader } from "@app/components";
import { useEffect, useState } from "react";
import "./forms.css";
import { toast } from 'react-toastify';
import {CREATE_USER_URL} from '../../../../apiUrls.jsx'
import { Link } from "react-router-dom";
import axios from "axios";
import { getUserById } from "../tables/UsersService";
import { ville, villes } from "@app/pages/Admin/forms/ville";



type User = {
  idUser: number;
  firstName: string;
  lastName:String;
  email: string;
  phone: string;
  role: string;
  retour:number;
  livraison:number;
  caisse:number
  status: string;
  createdAt: string;
};


const AjoutUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [retour, setRetour] = useState("");
  const [livraison, setLivraison] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [retourError, setRetourError] = useState("");
  const [livraisonError, setLivraisonError] = useState("");
  const [matriculeFiscaleError,setMatriculeFiscaleError]=useState("")
  const [matriculeFiscale,setMatriculeFiscale]=useState("")
  const [currentUser, setCurrentUser] = useState<User>();
  const [depart, setDepart] = useState("");
  const [departError, setDepartError] = useState("");
  const [departVille, setDepartVille] = useState("");
  const [villeDepartError, setVilleDepartError] = useState("");
  const [departCiteList, setDepartCiteList] = useState<string[]>([]);
  const [departCite, setDepartCite] = useState("");






  const validateEmail = (email:any) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  const validatePhoneNumber = (phone:any) => {
    const regex = /^\d{10}$/; // Assuming the phone number should be 10 digits long
    return regex.test(phone);
  };

  useEffect(() => {
    getCurrentUser()
  }, [])
  
  

  const saveData = async (e: any) => {
    e.preventDefault();
    let isValid = true;

  if (firstName.trim() === "") {
    setFirstNameError("Veuillez entrer prenom");
    isValid = false;
  } else {
    setFirstNameError("");
  }

  if (lastName.trim() === "") {
    setLastNameError("Veuillez entrer nom");
    isValid = false;
  } else {
    setLastNameError("");
  }

  if (email.trim() === "") {
    setEmailError("Veuillez entrer email");
    isValid = false;
  } else if (!validateEmail(email)) {
    setEmailError("Veuillez entrer email valide");
    isValid = false;
  } else {
    setEmailError("");
  }

  if (phone.trim() === "") {
    setPhoneError("Veuillez entrer téléphone");
    isValid = false;
  } else {
    setPhoneError("");
  }

  if (role === "") {
    setRoleError("Veuillez entrer selectionner role");
    isValid = false;
  } else {
    setRoleError("");
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

  if (role === "client") {
    if (retour === "") {
      setRetourError("Veuillez entrer prix de retour");
      isValid = false;
    } else {
      setRetourError("");
    }
    if (livraison === "") {
      setLivraisonError("Veuillez entrer prix de livraison");
      isValid = false;
    } else {
      setLivraisonError("");
    }
    if(matriculeFiscale===""){
      setMatriculeFiscaleError("Veuillez entrer le numéro fiscale")
      isValid = false
    }else{
        setMatriculeFiscaleError("")
    }
  }

  if (!isValid) {
    return; // Don't proceed if there are validation errors
  }
    const currentUrl = window.location.href;
    let UserId:number;
    const user={
      firstName:firstName,
      lastName:lastName,
      email:email,
      role:role,
      phone:phone,
      livraison:livraison,
      retour:retour,
      matriculeFiscale:matriculeFiscale,
      address:depart,
      cite:departCite,
      ville:departVille,
      caisse:role == "livreur" ? 0 : null,
      currentUrl:currentUrl,

    }
  
    try {
        const response = await fetch(CREATE_USER_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      const resposeData=response.json()
      toast.success('Utilisateur Ajouté avec Succés');
      console.log(resposeData)
      window.location.href = "/#/users";
    }catch(errorr){
      toast.error('Failed');
      throw(errorr)
    }
  };

  const getCurrentUser = async() => {
    setCurrentUser(await getUserById())
  }

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

  return (
    <>
      <ContentHeader title="Ajouter Utilisateur" />
      <div className="card card-primary form-card">
        <div className="card-header">
          <h3 className="card-title">Ajouter User</h3>
        </div>
        {/* /.card-header */}
        {/* form start */}
        <form>
          <div className="card-body">
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Nom</label>
                  <input
                    onChange={(e) => setFirstName(e.currentTarget.value)}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Entrer le Nom"
                  />
                  {firstNameError && <div className="error">{firstNameError}<i style={{fontSize:"14px"}} className="fas fa-exclamation ml-2"></i></div>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Prenom</label>
                  <input
                    onChange={(e) => setLastName(e.currentTarget.value)}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Entrer la prenom"
                  />
                  {lastNameError && <div className="error">{lastNameError}<i style={{fontSize:"14px"}} className="fas fa-exclamation ml-2"></i></div>}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <input
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Entrer l'email"
                  />
                  {emailError && <div className="error">{emailError}<i style={{fontSize:"14px"}} className="fas fa-exclamation ml-2"></i></div>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Téléphone</label>
                  <input
                    onChange={(e) => setPhone(e.currentTarget.value)}
                    type="tel"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Entrer le numéro de téléphone"
                  />
                  {phoneError && <div className="error">{phoneError}<i style={{fontSize:"14px"}} className="fas fa-exclamation ml-2"></i></div>}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label>Role</label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setRole(e.target.value);
                      console.log(role);
                    }}
                  >
                    <option disabled selected>Selectionner Role</option>
                    <option value="client">Client</option>
                    <option value="livreur">Livreur</option>
                    {currentUser?.role == "superAdmin" &&( <option value="admin">Admin</option>)}
                  </select>
                  {roleError && <div className="error">{roleError}<i style={{fontSize:"14px"}} className="fas fa-exclamation ml-2"></i></div>}
                </div>
              </div>
            </div>
            <div className="form-group">
              {role == "client" && (
                  <div className="row">
                      <div className="col-md-3">
                        <label htmlFor="exampleInputEmail1">Retour</label>
                        <input
                          onChange={(e) => setRetour(e.currentTarget.value)}
                          type="number"
                          className="form-control"
                          id="exampleInputEmail1"
                          placeholder="Entrer le prix de retour en DT"
                        />
                        {retourError && <div className="error">{retourError}<i style={{fontSize:"14px"}} className="fas fa-exclamation ml-2"></i></div>}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="exampleInputEmail1">Livraison</label>
                        <input
                          onChange={(e) => setLivraison(e.currentTarget.value)}
                          type="number"
                          className="form-control"
                          id="exampleInputEmail1"
                          placeholder="Entrer le prix de livraison en DT"
                        />
                        {livraisonError && <div className="error">{livraisonError}<i style={{fontSize:"14px"}} className="fas fa-exclamation ml-2"></i></div>}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="exampleInputEmail1">Matricule Fiscale</label>
                        <input
                          onChange={(e) => setMatriculeFiscale(e.currentTarget.value)}
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          placeholder="Matricule Fiscale"
                        />
                        {matriculeFiscaleError && <div className="error">{matriculeFiscaleError}<i style={{fontSize:"14px"}} className="fas fa-exclamation ml-2"></i></div>}
                      </div>
                  </div>
                  )}
            </div>
            {role == "client" && (
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
              </div>
              {(departVille != "") && <div className="row">
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
              </div>}
            </div>
            )}
          </div>
          {/* /.card-body */}
          <div className="card-footer">
            <button type="button" className="btn btn-primary" onClick={saveData}>
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AjoutUser;
