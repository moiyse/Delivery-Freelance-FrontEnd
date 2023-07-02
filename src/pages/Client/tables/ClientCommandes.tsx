import { useEffect } from "react";
import "./users.css";

const ClientCommandes = () => {
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
                      <th>Articles</th>
                      <th>Created At</th>
                      <th>Destination</th>
                      <th>Deliver At</th>
                      <th>Commande Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
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
                    </tr>
                    <tr>
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
                    </tr>

                    <tr>
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
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Articles</th>
                      <th>Created At</th>
                      <th>Destination</th>
                      <th>Deliver At</th>
                      <th>Commande Status</th>
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

export default ClientCommandes;
