import { useEffect } from "react";
import "./users.css";

const Commandes = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "js/tableCommande.js";
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
                      <th>Id Commande</th>
                      <th>Client</th>
                      <th>Articles</th>
                      <th>Created At</th>
                      <th>Destination</th>
                      <th>Deliver At</th>
                      <th>Commande Status</th>
                      <th>Livreur</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>4</td>
                      <td>John Doe</td>
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
                          <a
                            className="dropdown-item"
                          >
                            Shoes
                          </a>
                          <a className="dropdown-item">
                            Table
                          </a>
                          <a className="dropdown-item">
                            Vest
                          </a>
                        </div>
                      </td>
                      <td>06/30/2023</td>
                      <td>36.842427, 10.163887</td>
                      <td>07/16/2023</td>
                      <td className="pill-td">
                        <span className="badge bg-warning">Waiting Pickup</span>
                      </td>
                      <td>
                        <a
                          style={{ textDecoration: "none" }}
                          className="dropdown-toggle dropdown-icon"
                          data-toggle="dropdown"
                          aria-expanded="true"
                        >
                          Choose Livreur
                        </a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="#">
                            Livreur 1
                          </a>
                          <a className="dropdown-item" href="#">
                            Livreur 2
                          </a>
                          <a className="dropdown-item" href="#">
                            Livreur 3
                          </a>
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
                          <button type="button" className="btn btn-danger">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Michael Brown</td>
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
                          <a
                            className="dropdown-item"
                          >
                            Book
                          </a>
                          <a className="dropdown-item">
                            Desk
                          </a>
                          <a className="dropdown-item">
                            Coat
                          </a>
                        </div>
                      </td>
                      <td>06/27/2023</td>
                      <td>37.7749° N, 122.4194° W</td>
                      <td>07/13/2023</td>
                      <td className="pill-td">
                        <span className="badge bg-success">Delivered</span>
                      </td>
                      <td>
                        <a
                          style={{ textDecoration: "none" }}
                          className="dropdown-toggle dropdown-icon"
                          data-toggle="dropdown"
                          aria-expanded="true"
                        >
                          Choose Livreur
                        </a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="#">
                            Livreur 1
                          </a>
                          <a className="dropdown-item" href="#">
                            Livreur 2
                          </a>
                          <a className="dropdown-item" href="#">
                            Livreur 3
                          </a>
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
                          <button type="button" className="btn btn-danger">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>8</td>
                      <td>Sarah Johnson</td>
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
                          <a
                            className="dropdown-item"
                            
                          >
                            Camera
                          </a>
                          <a className="dropdown-item">
                            Chair
                          </a>
                          <a className="dropdown-item" >
                            Shirt
                          </a>
                        </div>
                      </td>
                      <td>06/26/2023</td>
                      <td>51.5074° N, 0.1278° W</td>
                      <td>07/12/2023</td>
                      <td className="pill-td">
                        <span className="badge bg-warning">Waiting Pickup</span>
                      </td>
                      <td>
                        <a
                          style={{ textDecoration: "none" }}
                          className="dropdown-toggle dropdown-icon"
                          data-toggle="dropdown"
                          aria-expanded="true"
                        >
                          Choose Livreur
                        </a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="#">
                            Livreur 1
                          </a>
                          <a className="dropdown-item" href="#">
                            Livreur 2
                          </a>
                          <a className="dropdown-item" href="#">
                            Livreur 3
                          </a>
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
                          <button type="button" className="btn btn-danger">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>Olivia Davis</td>
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
                          <a
                            className="dropdown-item"
                            
                          >
                            Watch
                          </a>
                          <a className="dropdown-item">
                            Sofa
                          </a>
                          <a className="dropdown-item">
                            T-shirt
                          </a>
                        </div>
                      </td>
                      <td>06/25/2023</td>
                      <td>40.7128° N, 74.0060° W</td>
                      <td>07/11/2023</td>
                      <td className="pill-td">
                        <span className="badge bg-info">Picked Up</span>
                      </td>
                      <td>
                        <a
                          style={{ textDecoration: "none" }}
                          className="dropdown-toggle dropdown-icon"
                          data-toggle="dropdown"
                          aria-expanded="true"
                        >
                          Livreur 3
                        </a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="#">
                            Livreur 1
                          </a>
                          <a className="dropdown-item" href="#">
                            Livreur 2
                          </a>
                          <a className="dropdown-item" href="#">
                            Livreur 3
                          </a>
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
                          <button type="button" className="btn btn-danger">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>11</td>
                      <td>James Wilson</td>
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
                          <a
                            className="dropdown-item"
                          >
                            Headphones
                          </a>
                          <a className="dropdown-item">
                            Table
                          </a>
                          <a className="dropdown-item">
                            Jacket
                          </a>
                        </div>
                      </td>
                      <td>06/24/2023</td>
                      <td>37.7749° N, 122.4194° W</td>
                      <td>07/10/2023</td>
                      <td className="pill-td">
                        <span className="badge bg-danger">Canceled</span>
                      </td>
                      <td>
                        <a
                          style={{ textDecoration: "none" }}
                          className="dropdown-toggle dropdown-icon"
                          data-toggle="dropdown"
                          aria-expanded="true"
                        >
                          Livreur 1
                        </a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="#">
                            Livreur 1
                          </a>
                          <a className="dropdown-item" href="#">
                            Livreur 2
                          </a>
                          <a className="dropdown-item" href="#">
                            Livreur 3
                          </a>
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
                          <button type="button" className="btn btn-danger">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Id Commande</th>
                      <th>Client</th>
                      <th>Articles</th>
                      <th>Created At</th>
                      <th>Destination</th>
                      <th>Deliver At</th>
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
