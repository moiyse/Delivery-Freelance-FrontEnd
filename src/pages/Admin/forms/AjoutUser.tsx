import { ContentHeader } from "@app/components";
import { useState } from "react";
import "./forms.css";
import { CREATE_USER_URL } from "../../../../apiUrls.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
const AjoutUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [retour, setRetour] = useState("");
  const [livraison, setLivraison] = useState("");

  const saveData = async (e: any) => {
    e.preventDefault();
    const currentUrl = window.location.href;
    let UserId:number;
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("role", role);
    formData.append("retour", retour);
    formData.append("livraison", livraison);
    formData.append("phone", phone);
    formData.append("currentUrl", currentUrl);
  
    try {
      await axios.post(CREATE_USER_URL, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(function (response) {
        console.log(response.data)
        window.location.href = "/users";
        
    });
    } catch (error) {
      console.log(error);
    }
  };

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
                    <option value="Client">Client</option>
                    <option value="Livreur">Livreur</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
            {role == "Client" && (
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
                  </div>
                </div>
                )}
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

export default AjoutUser;
