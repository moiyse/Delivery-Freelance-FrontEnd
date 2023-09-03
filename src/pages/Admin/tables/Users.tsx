import { useEffect, useState } from "react";
import "./users.css";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import UpdateUser from "../forms/UpdateUser";
import {GET_ALL_USERS_URL} from '../../../../apiUrls.jsx'
import { deleteUserById } from "@app/pages/Admin/tables/UsersService";
import { ContentHeader } from "@app/components";
import { sleep } from "@app/utils/helpers";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
import { getCurrentUser } from "@app/services/auth";
type User = {
  idUser: number;
  firstName: string;
  lastName:String;
  email: string;
  phone: string;
  role: string;
  matriculeFiscale:string;
  retour:number;
  livraison:number;
  caisse:number
  status: string;
  createdAt: string;
};

const Users = () => {
  const [users,setUsers]=useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const script = document.createElement("script");
  
  const handleUpdateClick = (userId:number,role:string) => {
    if(role == "superAdmin")
    {
      toast.error("Utilisateur est un superAdmin !")
    }
    else{
      if(role == "admin" && currentUser?.role == "admin")
      {
        toast.error("Il faut être superAdmin !")
      }
      else{
        setSelectedUserId(userId);
        setOpenDialog(true);
      }
    }
    
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    fetchUsers()
  };
   
 
  useEffect(() => {
    fetchUsers();
    setCurrentUser(getCurrentUser())
  }, []);


  useEffect(() => {
    if(users.length != 0 && !document.body.contains(script))
    {
      console.log("here")
      
      script.src = "js/table.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Clean up the added script when the component unmounts
        document.body.removeChild(script);
      };
    }
  }, [users]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(GET_ALL_USERS_URL);
      const data = await response.json();
      setUsers(data);
      setLoading(false)
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const deleteUser = (idUser:number,firstName:string,lastName:String,role:String) => {
    if(role == "superAdmin")
    {
      toast.error("Utilisateur est un super Admin")
    }
    else
    {
      if(role == "admin" && currentUser?.role == "admin")
      {
        toast.error("Il faut être superAdmin !")
      }
      else{
        Swal.fire({
          title: 'Supprimer un utilisateur',
          text: `Etes vous sur de supprimer l'utilisateur " ${firstName} ${lastName} " ?`,
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'Supprimer',
          cancelButtonText: 'Retour'
        }).then(async (result) => {
          if (result.isConfirmed) {
            await deleteUserById(idUser)
            setUsers((prevUsers) => prevUsers.filter((user) => user.idUser !== idUser));
            window.location.reload()
          }
        });
      }
      
    }
    
    
  }
  
  return (
    <>
      <ContentHeader title="List Utilisateurs"/>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* /.card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Tous les utilisateurs</h3>
              </div>
              {/* /.card-header */}
              <div style={{overflow:"auto"}} className="card-body">
                <table
                  id="userTable"
                  className="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>User Id</th>
                      <th>Nom Prenom</th>
                      <th>Email</th>
                      <th>Telephone</th>
                      <th>Role</th>
                      <th>Matricule</th>
                      <th>Prix Livraison</th>
                      <th>Prix Retour</th>
                      <th>Caisse</th>
                      <th>Date d'inscription</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    { users.length===0 || loading === true? (
                      <tr>
                        <td className="text-center">Pas d'utilisateur</td>
                        <td className="text-center">Pas d'utilisateur</td>
                        <td className="text-center">Pas d'utilisateur</td>
                        <td className="text-center">Pas d'utilisateur</td>
                        <td className="text-center">Pas d'utilisateur</td>
                        <td className="text-center">Pas d'utilisateur</td>
                        <td className="text-center">Pas d'utilisateur</td>
                        <td className="text-center">Pas d'utilisateur</td>
                        <td className="text-center">Pas d'utilisateur</td>
                        <td className="text-center">Pas d'utilisateur</td>
                      </tr>
                    ):(
                      users.map((user)=>{
                        return(
                            <tr key={user.idUser}>
                            <td>{user.idUser}</td>
                            <td>{user.firstName +" "+ user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td>{user.matriculeFiscale}</td>
                            <td>
                              {user.role == "client" ? (user.livraison + " DT") : "-.-.-.-"}
                            
                            </td>
                            <td>
                              {user.role == "client" ? (user.retour + " DT") : "-.-.-.-"}
                            
                            </td>
                            <td>
                              {user.role == "livreur" ? (user.caisse ? (user.caisse + " DT") : "0 DT") : "-.-.-.-"}
                            
                            </td>
                            <td>{user.createdAt}</td>
                            <td>
                              <div className="btn-group">
                                <button onClick={() => handleUpdateClick(user.idUser,user.role)} type="button" className="btn btn-warning">
                                  <i className="fas fa-pen"></i>
                                </button>
                                <button type="button" className="btn btn-danger" onClick={()=>{deleteUser(user.idUser,user.firstName,user.lastName,user.role)}}>
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
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
      
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <UpdateUser userId={selectedUserId} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>


    </>
  );
};

export default Users;