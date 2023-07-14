import { useEffect, useState } from "react";
import "./users.css";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import UpdateUser from "../forms/UpdateUser";
import {GET_ALL_USERS_URL} from '../../../../apiUrls.jsx'
import { deleteUserById } from "@app/pages/Admin/tables/UsersService";
import { ContentHeader } from "@app/components";
import { sleep } from "@app/utils/helpers";
import Swal from 'sweetalert2';
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
const Livreur = () => {
  const [users,setUsers]=useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  
  const handleUpdateClick = (userId:number) => {
    setSelectedUserId(userId);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
   
 
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if(users.length != 0)
    {
      const script = document.createElement("script");
      script.src = "js/tableLivreur.js";
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
      console.log("data fetched",data)
      let livreurs = data.filter((user:any) => user.role == "livreur")
      setUsers(livreurs);
      console.log("livreurs : ",users)
      setLoading(false)
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const deleteUser = (idUser:number,firstName:string,lastName:String) => {
    Swal.fire({
      title: 'Supprimer un utilisateur',
      text: `Etes vous sur de supprimer le livreur " ${firstName} ${lastName} " ?`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Retour'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteUserById(idUser)
        window.location.href = window.location.href
      }
    });
    
  }

  
  const removeUser = (userId:number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.idUser !== userId));
  };
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });
  
  return (
    <>
      <ContentHeader title="List Utilisateurs"/>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* /.card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Tous les Livreur</h3>
              </div>
              {/* /.card-header */}
              <div className="card-body">
                <table
                  id="userTable"
                  className="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>Nom Prenom</th>
                      <th>Email</th>
                      <th>Telephone</th>
                      <th>Caisse</th>
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
                      </tr>
                    ):(
                      users.map((user)=>{
                        return(
                          <tr key={user.idUser}>
                            <td>{user.firstName + user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                              {user.role == "livreur" ? (user.caisse ? (user.caisse + " DT") : "0 DT") : "-.-.-.-"}
                            
                            </td>
                            <td>
                              <div className="btn-group">
                                <button type="button" className="btn btn-danger" onClick={()=>{deleteUser(user.idUser,user.firstName,user.lastName)}}>
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
                      <th>Nom Prenom</th>
                      <th>Email</th>
                      <th>Telephone</th>
                      <th>Caisse</th>
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

export default Livreur;