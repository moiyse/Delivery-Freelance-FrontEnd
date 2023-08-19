import { useState,useEffect } from "react";
import "./forms.css";
import {GET_USER_BY_ID_URL} from '../../../../apiUrls'
import { getUserById, updateUserById } from "../tables/UsersService";
import { toast } from 'react-toastify';
import { User } from "oidc-client-ts";
interface UpdateUserProps {
    userId: number | null;
}

const UpdateUser: React.FC<UpdateUserProps> = ({userId}) => {
  const [user,setUser]=useState({
    idUser: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    status: '',
    livraison:'',
    retour:'',
    caisse:'',
    createdAt: ''})
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [status,setStatus]=useState('')
  const [role, setRole] = useState("");
  const [retour, setRetour] = useState("");
  const [livraison, setLivraison] = useState("");
  const [caisse, setCaisse] = useState("");
  const [currentUser, setCurrentUser] = useState<User>();


  useEffect(() => {
    getCurrentUser()
  }, [])

  const getCurrentUser = async() => {
    setCurrentUser(await getUserById())
  }

  useEffect(() => {
    console.log(userId)
    const getUserById = async () => {
        try {
          const response = await fetch(GET_USER_BY_ID_URL(userId));
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            setUser(data)
          } else {
            console.log('Error userset:', response.status);
          }
        } catch (error) {
          throw(error)
        }
      };
      getUserById()
      if(user.role == "superAdmin"){
        toast.error("Utilisateur est un Super Admin")
      }
      console.log("user gotten",user)
  }, [user]);

  const handleUpdateButton=async()=>{
    const userUpdated={
      firstName:firstName ||user.firstName,
      lastName:lastName || user.lastName ,
      email:email || user.email ,
      role:role || user.role ,
      phone:phone || user.phone,
      status:status || user.status,
      livraison:livraison || user.livraison,
      retour:retour || user.retour,
      caisse:caisse || user.caisse,
    }
    try{
      updateUserById(userId,userUpdated)
      toast.success('Utilisateur Mofidié avec Succés');
    }catch(error){
      toast.error('Failed');
    }

  }
  
  return (
    <>
      <div className="card card-primary form-card">
        <div className="card-header">
          <h3 className="card-title">Modifier Utilisateur</h3>
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
                    placeholder={user.firstName}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Prenom</label>
                  <input
                    onChange={(e)=>setLastName(e.currentTarget.value)}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder={user.lastName}
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
                    placeholder={user.email}
                  />
                </div>
                <div className="col-md-6">
                  <label>Selectionner Role</label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setRole(e.target.value);
                      console.log(role);
                    }}
                  >
                    <option disabled selected>{user.role}</option>
                    <option value="client">Client</option>
                    <option value="livreur">Livreur</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
            {(role == "client" || (user.role == "client" && role!="livreur")) && (
                  <div className="row">
                  <div className="col-md-3">
                    <label htmlFor="exampleInputEmail1">Retour</label>
                    <input
                      onChange={(e) => setRetour(e.currentTarget.value)}
                      type="number"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder={user.retour}
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="exampleInputEmail1">Livraison</label>
                    <input
                      onChange={(e) => setLivraison(e.currentTarget.value)}
                      type="number"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder={user.livraison}
                    />
                  </div>
                </div>
                )}
                {(role == "livreur" || (user.role == "livreur" && role!="client"))  && (
                  <div className="row">
                  <div className="col-md-3">
                    <label htmlFor="exampleInputEmail1">Caisse</label>
                    <input
                      onChange={(e) => setCaisse(e.currentTarget.value)}
                      type="number"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder={user.caisse}
                    />
                  </div>
                </div>
                )}
            </div>
            {role == "admin" || user.role == "admin" && (
              <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Téléphone</label>
                  <input
                    onChange={(e)=>setPhone(e.currentTarget.value)}
                    type="tel"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder={user.phone}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Selectionner Status</label>
                  <select defaultValue={user.status} className="form-control" onChange={(e) =>{ setStatus(e.target.value)}}>
                    <option>En Attente</option>
                    <option>Active</option>
                  </select>
                </div>
              </div>
            </div>
            )}
            
            
          </div>
          {/* /.card-body */}
          <div className="card-footer">
            <button onClick={handleUpdateButton} className="btn btn-primary" type="button">
              Modifier
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateUser;
