import { useEffect, useState } from "react";
import "./users.css";
import { deleteCommandeById, fetchCommandes, updateCommandeLivreur } from "../tables/CommandesService.js";
import { fetchAllLivreurs } from "./UsersService";
interface Commande{
  idCommande:number,
  depart:string,
  destination:string,
  paymentStatus:string,
  commandeStatus:string,
  createdAt:string,
  delivredAt:string,
  nomDestinataire:string,
  prenomDestinataire:string,
  phoneDestinataire:string,
  prixArticle:string,
  articles:string,
  livreurId:number
  clientId:number
}
interface Livreur {
  idUser:number
  firstName: string;
  lastName: string;
}
const Commandes = () => {
  const [commandes,setCommandes]=useState<Commande[]>([])
  const [livreurs,setLivreurs]=useState<Livreur[]>([])

  useEffect(() => {
    const getAllCommande=async()=>{
      const data = await fetchCommandes()
      setCommandes(data)
    }
    const getAllLivreur=async()=>{
      const data=await fetchAllLivreurs()
      setLivreurs(data)
    }
    getAllCommande()
    getAllLivreur()

    const script = document.createElement("script");
    script.src = "js/tableCommande.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const updateLivreurOfTheCommande=async(livreurId:number,commadeId:number)=>{
      updateCommandeLivreur(livreurId,commadeId)
  }

  const removeCommande = (commandeId:number) => {
    setCommandes((prevUsers) => prevUsers.filter((commande) => commande.idCommande !== commandeId));
  };
  
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* /.card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">DataTable with default features</h3>
              </div>
              {/* /.card-header */}
              <div className="card-body">
                <table
                  id="example1"
                  className="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Articles</th>
                      <th>Created At</th>
                      <th>Deliver At</th>
                      <th>Destination</th>
                      <th>Commande Status</th>
                      <th>Livreur</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commandes.length===0 ? (
                      <tr>
                      <td  className="text-center">
                        No users found.
                      </td>
                    </tr>
                    ):(
                      commandes.map((commande)=>{
                        return(
                          <tr>
                          <td>
                            clientId
                          </td>
                          <td>
                            <a
                              style={{ textDecoration: "none",color: "#212529" }}
                              className="dropdown-toggle dropdown-icon"
                              data-toggle="dropdown"
                              aria-expanded="true"
                            >
                              Articles
                            </a>
                            <div className="dropdown-menu">
                            {commande.articles.split('-').map((article, index) => (
                              <a className="dropdown-item" key={index}>
                                {article}
                              </a>
                            ))}
                            </div>
                          </td>
                          <td>{commande.createdAt}</td>
                          <td>{commande.delivredAt}</td>
                          <td>{commande.destination}</td>
                          <td className="pill-td">
                            <span className="badge bg-warning">{commande.commandeStatus}</span>
                          </td>
                          <td>
                            <a
                              style={{ textDecoration: "none",color: commande.livreurId ? "black" : "red" }}
                              className="dropdown-toggle dropdown-icon"
                              data-toggle="dropdown"
                              aria-expanded="true"
                            >
                              {commande.livreurId ? "Voir Livreur": "No Livreur"}
                            </a>
                            <div className="dropdown-menu">
                              
                                {livreurs.length===0 ?(
                                  <a className="dropdown-item">Vide</a>
                                ):(
                                  livreurs.map((liv)=>(
                                    <a  style={{ backgroundColor: liv.idUser === commande.livreurId ? 'red' : '' }}
                                        onClick={()=>{updateLivreurOfTheCommande(liv.idUser,commande.idCommande)}} className="dropdown-item" href="#">
                                      {liv.firstName}
                                    </a>
                                  ))
                                )}
                              
                            </div>
                          </td>
                          <td>
                            <div className="btn-group">
                              <button type="button" className="btn btn-warning">
                                <i className="fas fa-pen"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-info"
                                data-toggle="dropdown"
                                aria-expanded="true"
                              >
                                <i className="fa fa-bars" />
                              </button>
                              <ul
                                className="dropdown-menu "
                                x-placement="top-start"
                                style={{
                                  position: "absolute",
                                  willChange: "transform",
                                  top: 0,
                                  left: 0,
                                  transform: "translate3d(-122px, -84px, 0px)",
                                }}
                              >
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Waiting Pickup
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Picked Up
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Delivered
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Canceled
                                  </a>
                                </li>
                              </ul>
                              <button type="button" className="btn btn-danger" onClick={()=>{deleteCommandeById(commande.idCommande);removeCommande(commande.idCommande)}}>
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        )
                      })
                    )}

                    
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Client</th>
                      <th>Articles</th>
                      <th>Created At</th>
                      <th>Deliver At</th>
                      <th>Destination</th>
                      <th>Commande Status</th>
                      <th>Livreur</th>
                      <th>Actions</th>
                    </tr>
                  </tfoot>
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

export default Commandes;
