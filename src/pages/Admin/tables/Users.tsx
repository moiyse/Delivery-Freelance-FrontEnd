import { useEffect, useState } from "react";
import "./users.css";
import {GET_ALL_USERS_URL,UPDATE_USER_BY_ID} from '../../../../apiUrls.jsx'
import { deleteUserById } from "@app/pages/Admin/tables/UsersService";
type User = {
  idUser: number;
  firstName: string;
  lastName:String;
  email: string;
  phone: string;
  role: string;
  status: string;
  createdAt: string;
};
const Users = () => {
  const [users,setUsers]=useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("");
 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(GET_ALL_USERS_URL);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchUsers();  
    const script = document.createElement("script");
    script.src = "js/table.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const removeUser = (userId:number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.idUser !== userId));
  };
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });
  
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
                <div className="card-header">
                  <div className="d-flex justify-content-end">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
              </div>
              <div className="card-body">
                <table
                  id="example1"
                  className="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>Nom Prenom</th>
                      <th>Email</th>
                      <th>Telephone</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Date d'inscription</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    { filteredUsers.length===0? (
                      <tr>
                        <td  className="text-center">
                          No users found.
                        </td>
                      </tr>
                    ):(
                      filteredUsers.map((user)=>{
                        return(
                          <tr key={user.idUser}>
                            <td>{user.firstName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td className="pill-td">
                            <span
                                className={`badge ${
                                  user.status === "Active" ? "bg-success" : "bg-danger"
                                } dropdown-toggle dropdown-icon`}
                                data-toggle="dropdown"
                                aria-expanded="true"
                              >
                                <a style={{ textDecoration: "none" }}>{user.status}</a>
                                <div className="dropdown-menu">
                                  <a className="dropdown-item" href="#" >
                                    Active
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    En Attente
                                  </a>
                                </div>
                            </span>
                            </td>
                            <td>{user.createdAt}</td>
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
                                      Admin
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      Livreur
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      Client
                                    </a>
                                  </li>
                                </ul>
                                <button type="button" className="btn btn-danger" onClick={()=>{deleteUserById(user.idUser);removeUser(user.idUser)}}>
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
                      <th>Role</th>
                      <th>Status</th>
                      <th>Date d'inscription</th>
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

export default Users;