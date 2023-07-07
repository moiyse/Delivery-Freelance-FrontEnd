import { ContentHeader } from "@app/components";
import { useState } from "react";
import "./forms.css";
import { toast } from 'react-toastify';
import {CREATE_USER_URL} from '../../../../apiUrls.jsx'
const AjoutUser = () => {
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [role,setRole]=useState('')
  const saveData=async()=>{
    const user={
      firstName:firstName,
      lastName:lastName,
      email:email,
      role:role,
      phone:phone
    }
    try{
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
    }catch(errorr){
      toast.error('Failed');
      throw(errorr)
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
                    onChange={(e)=>setFirstName(e.currentTarget.value)}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Entrer le Nom"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Prenom</label>
                  <input
                    onChange={(e)=>setLastName(e.currentTarget.value)}
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
                    onChange={(e)=>setEmail(e.currentTarget.value)}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Entrer l'email"
                  />
                </div>
                <div className="col-md-6">
                  <label>Selectionner Role</label>
                  <select className="form-control" onChange={(e) =>{ setRole(e.target.value);console.log(role)}}>
                    <option>Client</option>
                    <option>Livreur</option>
                    <option>Admin</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Téléphone</label>
                  <input
                    onChange={(e)=>setPhone(e.currentTarget.value)}
                    type="tel"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Entrer le numéro de téléphone"
                  />
                </div>
              </div>
            </div>
            
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
