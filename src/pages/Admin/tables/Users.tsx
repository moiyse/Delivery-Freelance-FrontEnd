import { useEffect } from "react";
import "./users.css";

const Users = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "js/table.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* /.card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Tous les utilisateurs</h3>
              </div>
              {/* /.card-header */}
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
                    <tr>
                      <td>Mohamed Zgolli</td>
                      <td>mohamedzg@gmail.com</td>
                      <td>98785462</td>
                      <td>livreur</td>
                      <td className="pill-td">
                        <span
                          className="badge bg-success dropdown-toggle dropdown-icon"
                          data-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <a style={{ textDecoration: "none" }}>Active</a>
                          <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">
                              Active
                            </a>
                            <a className="dropdown-item" href="#">
                              En Attente
                            </a>
                          </div>
                        </span>
                      </td>
                      <td>03/08/2023</td>
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
                          <button type="button" className="btn btn-danger">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>John Doe</td>
                      <td>johndoe@example.com</td>
                      <td>1234567890</td>
                      <td>client</td>
                      <td className="pill-td">
                        <span
                          className="badge bg-danger dropdown-toggle dropdown-icon"
                          data-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <a style={{ textDecoration: "none" }}>En Attente</a>
                          <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">
                              En Attente
                            </a>
                            <a className="dropdown-item" href="#">
                              Active
                            </a>
                          </div>
                        </span>
                      </td>
                      <td>06/15/2023</td>
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
                          <button type="button" className="btn btn-danger">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Jane Smith</td>
                      <td>janesmith@example.com</td>
                      <td>9876543210</td>
                      <td>admin</td>
                      <td className="pill-td">
                        <span
                          className="badge bg-success dropdown-toggle dropdown-icon"
                          data-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <a style={{ textDecoration: "none" }}>Active</a>
                          <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">
                              Active
                            </a>
                            <a className="dropdown-item" href="#">
                              En Attente
                            </a>
                          </div>
                        </span>
                      </td>
                      <td>05/20/2023</td>
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
                          <button type="button" className="btn btn-danger">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Sarah Johnson</td>
                      <td>sarahjohnson@example.com</td>
                      <td>5551234567</td>
                      <td>client</td>
                      <td className="pill-td">
                        <span
                          className="badge bg-danger dropdown-toggle dropdown-icon"
                          data-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <a style={{ textDecoration: "none" }}>En Attente</a>
                          <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">
                              En Attente
                            </a>
                            <a className="dropdown-item" href="#">
                              Active
                            </a>
                          </div>
                        </span>
                      </td>
                      <td>07/01/2023</td>
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
                          <button type="button" className="btn btn-danger">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Robert Brown</td>
                      <td>robertbrown@example.com</td>
                      <td>9998887777</td>
                      <td>admin</td>
                      <td className="pill-td">
                        <span
                          className="badge bg-success dropdown-toggle dropdown-icon"
                          data-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <a style={{ textDecoration: "none" }}>Active</a>
                          <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">
                              Active
                            </a>
                            <a className="dropdown-item" href="#">
                              En Attente
                            </a>
                          </div>
                        </span>
                      </td>
                      <td>04/10/2023</td>
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
                          <button type="button" className="btn btn-danger">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Laura Lee</td>
                      <td>lauralee@example.com</td>
                      <td>2223334444</td>
                      <td>client</td>
                      <td className="pill-td">
                        <span
                          className="badge bg-success dropdown-toggle dropdown-icon"
                          data-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <a style={{ textDecoration: "none" }}>Active</a>
                          <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">
                              Active
                            </a>
                            <a className="dropdown-item" href="#">
                              En Attente
                            </a>
                          </div>
                        </span>
                      </td>
                      <td>08/25/2023</td>
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
                          <button type="button" className="btn btn-danger">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
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
